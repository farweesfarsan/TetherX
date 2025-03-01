const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Seller = mongoose.model('Seller');
const Buyer = mongoose.model('Buyer');
const User = mongoose.model('User');
const Wallet = mongoose.model('Wallet');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/wallet/:walletId',async(req,res)=>{
  try {
    const wallet = await Wallet.findOne({walletId:req.params.walletId});
    if(!wallet){
        res.status(404).json({message:"Wallet not found"});
    }

     res.json(wallet);

  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

router.put('/wallet/:walletId',authMiddleware, async (req, res) => {
    try {
        const { balanceUSD, balanceLKR } = req.body;

        // Check if the required fields are provided
        if (balanceUSD === undefined || balanceLKR === undefined) {
            return res.status(400).json({ message: "Both balanceUSD and balanceLKR are required" });
        }

        // Find and update the wallet
        const wallet = await Wallet.findOneAndUpdate(
            { walletId: req.params.walletId },
            { balanceUSD, balanceLKR },
            { new: true, runValidators: true } // new: true returns the updated document
        );

        // If the wallet was not found, return a 404 response
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        // Respond with the updated wallet data
        res.json(wallet);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// router.post('/wallet/addHundredDollers', authMiddleware, async (req, res) => {
//   try {
//     // Use findOne instead of findById
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({
//         message: "user not found!"
//       });
//     }

//     user.balanceUSD += 100;
//     await user.save();

//     res.status(200).json({
//       message: "100 USD added to your wallet successfully",
//       balanceUSD: user.balanceUSD,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

router.post('/wallet/addHundredDollers', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the user has already claimed 100 USD
    if (user.hasClaimedBonus) {
      return res.status(400).json({ message: "You have already claimed 100 USD." });
    }

    // Add 100 USD to the user's balance (only if they haven't claimed before)
    user.balanceUSD += 100;
    user.hasClaimedBonus = true; // Set flag to prevent further claims
    await user.save();

    res.status(200).json({
      message: "100 USD added to your wallet successfully",
      balanceUSD: user.balanceUSD,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});





router.get('/user', authMiddleware, async (req, res) => {
    try {
      // Find the wallet associated with the user
      const wallet = await Wallet.findOne({ user: req.user._id });
      
  
      // Check if a wallet was found
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found for this user" });
      }
  
      // Respond with the user details and the balanceUSD from the wallet
      res.json({
        userId: req.user._id,
        role: req.user.role,
        sellerWalletId: req.sellerWalletId,
        firstName: req.firstName,
        lastName: req.lastName,
        balanceUSD: req.user.balanceUSD // Add balanceUSD from the wallet
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });


module.exports = router;