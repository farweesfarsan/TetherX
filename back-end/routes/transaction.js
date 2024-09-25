const router = require('express').Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');


// transfer money from one account to another
router.post('/transfer-fund', async (req, res) => {
  try {
    // save the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    // decrease the sender's balance and log it
    const sender = await User.findByIdAndUpdate(
      req.body.sender,
      { $inc: { balanceUSD: -req.body.amount } },
      { new: true }
    );
    console.log('Sender balance is', sender.balanceUSD);

    // increase the receiver's balance
    const receiver = await User.findByIdAndUpdate(
      req.body.receiver,
      { $inc: { balanceUSD: req.body.amount } },
      { new: true }
    );
    console.log('Receiver balance is', receiver.balanceUSD);

    res.send({
      message: 'Transaction Successful',
      data: newTransaction,
      success: true,
    });
  } catch (error) {
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
      
      const user = await User.findOne({_id: req.body.receiver});
      
      if (user) {
        res.send({
          message: "Account verified",
          data: user,
          success: true
        });
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
        message: "Account not found",
        data: error.message,
        success: false
      });
    }
  });

module.exports = router;