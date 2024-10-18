const router = require('express').Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Seller = require('../models/Seller');
const Wallet = require('../models/Wallet');
const { authMiddleware } = require('../middleware/authMiddleware');
const moment = require('moment');


// transfer money from one account to another
router.post('/transfer-fund', async (req, res) => {
  try {
    // Find the receiver's user information
    const user = await User.findOne({ _id: req.body.receiver });

    // Retrieve the relevant seller information using the userId
    const seller = await Seller.findOne({ _id: user.sellers });

    if (!seller) {
      return res.status(404).send({
        message: 'Seller information not found for the receiver',
        success: false,
      });
    }

    const receiverName = `${seller.firstName} ${seller.lastName}`

    // Add the seller's first name to the transaction
    const newTransaction = new Transaction({
      ...req.body,  // Spread the existing request data
      receiverName: receiverName   // Add the seller's first name as receiverName
    });

    // Save the transaction
    await newTransaction.save();

    // Decrease the sender's balance and log it
    const sender = await User.findByIdAndUpdate(
      req.body.sender,
      { $inc: { balanceUSD: -req.body.amount } },
      { new: true }
    );

    if (!sender) {
      return res.status(404).send({
        message: 'Sender not found',
        success: false,
      });
    }
    console.log('Sender balance is', sender.balanceUSD);

    // Increase the receiver's balance
    const receiver = await User.findByIdAndUpdate(
      req.body.receiver,
      { $inc: { balanceUSD: req.body.amount } },
      { new: true }
    );

    console.log('Receiver balance is', receiver.balanceUSD);

    // Send the success response with the new transaction
    res.send({
      message: 'Transaction Successful',
      data: newTransaction,
      success: true,
    });

  } catch (error) {
    console.error('Transaction error:', error);
    res.send({
      message: 'Transaction failed',
      data: error.message,
      success: false,
    });
  }
});


// verify the receiver account number
router.post('/verify-account', async (req, res) => {
  try {
    console.log("Receiver ID:", req.body.receiver); // Log the receiver ID being received
    
    // Find the user by receiver ID
    const user = await User.findOne({ _id: req.body.receiver });

    if (user) {
      // Assuming the user model has a 'sellerId' field which references the seller
      const seller = await Seller.findOne({ _id: user.sellers });

      if (seller) {
        res.send({
          message: "Account verified",
          data: {
            user: user,
            sellerName: seller.firstName // Returning the seller's name
          },
          success: true
        });
      } else {
        res.send({
          message: "Seller information not found for this user",
          data: user,
          success: true
        });
      }
    } else {
      res.send({
        message: "Account not found",
        data: null,
        success: false
      });
    }
  } catch (error) {
    console.error("Error in account verification:", error); // Log errors
    res.send({
      message: "Account verification failed",
      data: error.message,
      success: false
    });
  }
});

router.post('/get-all-transactions-by-user', authMiddleware, async (req, res) => {
  try {
    console.log("User ID received:", req.body._id); // Log the user ID
    
    const transactions = await Transaction.find({
      $or: [{ sender: req.body._id}, { receiver: req.body._id}],
    });

    console.log("Transaction query result:", transactions); // Log the transactions found
    
    res.send({
      message: "Transaction data fetched",
      data: transactions,
      success: true
    });
  } catch (error) {
    res.send({
      message: "Transaction not fetched",
      data: error.message,
      success: false
    });
  }
});

router.post('/get-last-seven-days-transactions',authMiddleware,async(req,res)=>{
  try {
    const userId = req.body._id;
    console.log("User ID received:", userId); // Log the user ID

    // Calculate the date from seven days ago
    const sevenDaysAgo = moment().subtract(7, 'days').startOf('day').toDate();

    // Find transactions where the sender or receiver is the user and the transaction was created in the last 7 days
    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
      createdAt: { $gte: sevenDaysAgo }
    });

    console.log("Transaction query result:", transactions); // Log the transactions found
    
    res.send({
      message: "Last seven days transactions fetched",
      data: transactions,
      success: true
    });
  } catch (error) {
    res.send({
      message: "Transactions not fetched",
      data: error.message,
      success: false
    });
  }
})

router.post('/get-today-transaction',authMiddleware,async(req,res)=>{
  try {
    const userId = req.body._id;
    console.log("User ID received:", userId); // Log the user ID

    // Get the start of the current day (midnight)
    const today = moment().startOf('day').toDate();

    // Find transactions where the sender or receiver is the user and the transaction was created today
    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }],
      createdAt: { $gte: today }
    });

    console.log("Today's Transaction query result:", transactions); // Log the transactions found

    res.send({
      message: "Today's transactions fetched",
      data: transactions,
      success: true
    });
  } catch (error) {
    res.send({
      message: "Transactions not fetched",
      data: error.message,
      success: false
    });
  }
})

module.exports = router;