const router = require('express').Router();
const Request = require('../models/Request');
const { authMiddleware } = require('../middleware/authMiddleware');
const Seller = require('../models/Seller');
const User = require('../models/User');
const Buyer = require('../models/Buyer');
const mongoose = require('mongoose');


router.post('/get-all-request-from-user', authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;

    // Define a filter to fetch only requests where the receiver matches the logged-in user
    const filter = userId ? { receiver: userId } : {};

    const requests = await Request.find(filter)
      .populate({
        path: 'sender',
        populate: {
          path: 'buyers', // Populate `buyers` within `sender`
          model: 'Buyer', // Ensure it uses the `Buyer` model
          select: 'firstName' // Only retrieve `firstName` from the Buyer model
        }
      })
      .populate('receiver'); // Optionally keep `receiver` populated if needed

    // Send requests with the buyer's `firstName` included
    res.send({
      data: requests,
      message: 'Requests fetched successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/send-request-to-seller', authMiddleware, async (req, res) => {
  try {
    const { sender, receiver, amount, description } = req.body;

    // Create and save a new request
    const request = new Request({
      sender,
      receiver,
      amount,
      description
    });

    await request.save();

    // Populate the `sender` field in the request to get the `User` document
    await request.populate({
      path: 'sender',
      populate: {
        path: 'buyers', // Populates the `buyers` field in `User`
        model: 'Buyer', // Tells Mongoose to use the `Buyer` model
        select: 'firstName' // Only select the `firstName` field from `Buyer`
      }
    });

    // Access the buyer's `firstName`
    const buyerFirstName = request.sender.buyers?.firstName;

    res.send({
      data: {
        ...request.toObject(),
        buyerFirstName: buyerFirstName || 'N/A' // Include the `firstName` in the response
      },
      message: 'Request Sent Successfully!',
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.get('/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find();
    const sellerIds = sellers.map(seller => seller._id);

    const users = await User.find({ sellers: { $in: sellerIds } }).select('sellers balanceUSD _id');
    console.log("Users found:", users);

    const sellersWithBalance = sellers.map(seller => {
      const user = users.find(u => u.sellers && u.sellers.equals(seller._id));
      return {
        sellerId: seller._id,
        sellerDetails: seller, 
        balanceUSD: user ? user.balanceUSD : null,
        userId: user ? user._id : null // Retrieve relevant user `_id`
      };
    });

    res.status(200).json({
      sellersWithBalance: sellersWithBalance, // Send the seller details with balanceUSD and userId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.post('/update-request-status', authMiddleware, async (req, res) => {
  try {
    const { _id, status, amount, sender, receiver } = req.body;

    // Check if the request status is "Accepted"
    if (status === 'Accepted') {
      if (!sender || !receiver) {
        return res.status(400).json({
          success: false,
          message: "Sender or Receiver not found",
        });
      }

      // Update the sender's balance
      const updatedSender = await User.findByIdAndUpdate(
        sender._id,
        { $inc: { balanceUSD: -amount } },
        { new: true } // Return updated document
      );

      // Update the receiver's balance
      const updatedReceiver = await User.findByIdAndUpdate(
        receiver._id,
        { $inc: { balanceUSD: amount } },
        { new: true }
      );

      if (!updatedSender || !updatedReceiver) {
        return res.status(400).json({
          success: false,
          message: "Balance update failed",
        });
      }
    }

    // Update request status
    await Request.findByIdAndUpdate(_id, { status });

    res.status(200).json({
      success: true,
      message: "Request Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
//Get logged user sent requests
router.get('/getRequests', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    let filter = {};

    if (req.user.role === 'Buyer') {
      filter = { sender: req.user._id };
    } else if (req.user.role === 'Seller') {
      filter = { receiver: req.user._id };
    }

    // Fetch requests and populate sender and receiver fields
    const requests = await Request.find(filter)
      .populate({
        path: 'sender',
        select: 'email role sellers buyers',
      })
      .populate({
        path: 'receiver',
        select: 'email role sellers buyers',
      })
      .sort({ createdAt: -1 })
      .limit(4);

    if (!requests.length) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    // Process requests and fetch firstName & lastName based on role
    const requestData = await Promise.all(
      requests.map(async (request) => {
        let userDetails = null;

        if (req.user.role === 'Buyer' && request.receiver) {
          // Fetch receiver details when user is Buyer
          if (request.receiver.role === 'Buyer') {
            const buyerDetails = await Buyer.findById(request.receiver.buyers).select('firstName lastName');
            userDetails = {
              _id: request.receiver._id,
              email: request.receiver.email,
              role: request.receiver.role,
              firstName: buyerDetails ? buyerDetails.firstName : null,
              lastName: buyerDetails ? buyerDetails.lastName : null,
            };
          } else if (request.receiver.role === 'Seller') {
            const sellerDetails = await Seller.findById(request.receiver.sellers).select('firstName lastName');
            userDetails = {
              _id: request.receiver._id,
              email: request.receiver.email,
              role: request.receiver.role,
              firstName: sellerDetails ? sellerDetails.firstName : null,
              lastName: sellerDetails ? sellerDetails.lastName : null,
            };
          }
        } else if (req.user.role === 'Seller' && request.sender) {
          // Fetch sender details when user is Seller
          if (request.sender.role === 'Buyer') {
            const buyerDetails = await Buyer.findById(request.sender.buyers).select('firstName lastName');
            userDetails = {
              _id: request.sender._id,
              email: request.sender.email,
              role: request.sender.role,
              firstName: buyerDetails ? buyerDetails.firstName : null,
              lastName: buyerDetails ? buyerDetails.lastName : null,
            };
          } else if (request.sender.role === 'Seller') {
            const sellerDetails = await Seller.findById(request.sender.sellers).select('firstName lastName');
            userDetails = {
              _id: request.sender._id,
              email: request.sender.email,
              role: request.sender.role,
              firstName: sellerDetails ? sellerDetails.firstName : null,
              lastName: sellerDetails ? sellerDetails.lastName : null,
            };
          }
        }

        return {
          _id: request._id,
          amount: request.amount,
          status: request.status,
          createdAt: request.createdAt,
          user: userDetails, // The sender or receiver details based on user role
        };
      })
    );

    res.status(200).json({
      success: true,
      data: requestData,
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});


router.get('/getTotalTransactionInfo', authMiddleware, async (req, res) => {
  try {
    const sellerTransactions = await Request.find({ receiver: req.user.id });

    if (sellerTransactions.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No transactions found for this user"
      });
    }

    // Calculate total accepted amount
    const totalAmount = sellerTransactions
      .filter(transaction => transaction.status === "Accepted")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    // Calculate total pending payments
    const totalPendingPayments = sellerTransactions
      .filter(transaction => transaction.status === "Pending")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    // Group transactions by sender and sum total amount per buyer
    const testTransactions = await Request.find({ receiver: req.user.id, status: "Accepted" });
    console.log("Test Transactions:", testTransactions); // Check if transactions exist

const buyerTotals = await Request.aggregate([
  { $match: { receiver: new mongoose.Types.ObjectId(req.user.id), status: "Accepted" } },

  { 
    $group: { 
      _id: "$sender", 
      totalSpent: { $sum: "$amount" } 
    } 
  }
]);

console.log("Buyer Totals:", buyerTotals); // Should now return actual results

    // Fetch user details for each sender (buyer)
    const buyerDetails = await Promise.all(
      buyerTotals.map(async (buyer) => {
        // First, find the user details (email)
        const user = await User.findById(buyer._id).select("email buyers");
        console.log("user data",user);
        
        // Then, find the buyer's name from the Buyer collection
        const buyerInfo = await Buyer.findById(user.buyers).select("firstName lastName");
    
        return {
          userId: buyer._id,
          name: buyerInfo ? `${buyerInfo.firstName} ${buyerInfo.lastName}` : "Unknown", // Fetch name from Buyer schema
          email: user ? user.email : "N/A", // Email comes from User schema
          totalSpent: buyer.totalSpent
        };
      })
    );
    

    res.status(200).json({
      success: true,
      totalTransactionAmount: totalAmount,
      totalPendingAmount: totalPendingPayments,
      buyerBreakdown: buyerDetails // List of all buyers and their total spent amounts
    });

  } catch (error) {
    console.error("Error fetching total transaction info:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

router.get('/getBuyerTransInfo',authMiddleware, async(req,res)=>{
    try {
        const statuses = ["Accepted","Pending","Rejected"];
        const [accepted,pending,rejected] = await Promise.all(
          statuses.map(status => Request.find({sender: req.user.id , status}))
        );
        
        const buyerTransaction = await Request.find({ sender: req.user.id});
        if(buyerTransaction.length == 0){
          return res.status(200).json({
            success:false,
            message:"No transactions found for this user"
          });
        }

        const buyerBoughtAmount = buyerTransaction
        .filter(transaction => transaction.status == "Accepted")
        .reduce((acc,transaction)=> acc + transaction.amount,0);

        const sellerTotals = await Request.aggregate([
          { $match: { sender: new mongoose.Types.ObjectId(req.user.id),status:"Accepted"} },

          {
            $group:{
              _id:'$receiver',
              totalSpent: { $sum: '$amount'}

            }
          }
        ]);

        console.log("Seller Totals",sellerTotals);

        const sellerDetails = await Promise.all(
          sellerTotals.map(async (seller)=>{
            const user = await User.findById(seller._id).select('email sellers');
            console.log("Seller trans data",user);

            const sellerInfo = await Seller.findById(user.sellers).select('firstName lastName');
            return {
             userId: seller._id,
             name: sellerInfo ? `${sellerInfo.firstName} ${sellerInfo.lastName}` : 'Unknown',
             totalSpent: seller.totalSpent
            }

          })
        )

        res.status(200).json({
          success:true,
          count:{
            accepted:accepted.length,
            pending:pending.length,
            rejected:rejected.length
          },
          acceptedAmount:buyerBoughtAmount,
          sellerRecords:sellerDetails
        });
        
    } catch (error) {
      console.error("Error fetching total transaction info:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    } 
})








module.exports = router;