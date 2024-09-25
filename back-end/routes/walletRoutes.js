const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');  // Adjust the path as needed
const User = mongoose.model('User');


// Create a new Wallet
router.post('/createWallet', async(req, res) => {
    try {
        const { user, balanceUSD, balanceLKR } = req.body;
        const newWallet = new Wallet({
            user,
            balanceUSD,
            balanceLKR
        });

        const savedWallet = await newWallet.save();

        // Update the user's walletId field with the generated walletId
        await User.findByIdAndUpdate(user, { walletId: savedWallet.walletId });

        res.status(200).json(savedWallet);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Retrieve a perticular wallet by it's id

router.get('/wallet/:walletId',async(req,res)=>{
    try {
        
        const wallet = await Wallet.findOne({walletId:req.params.walletId}).populate('user');
        if(!wallet){
            return res.status(404).json({message:"Wallet not found!"});
        }
        res.json(wallet);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

// Update wallet balance

router.put('/:walletId',async(req,res)=>{

    try {
        const {balanceUSD,balanceLKR} = req.body;
        const wallet = await Wallet.findOneAndUpdate(
            {walletId:req.params.walletId},
            {balanceUSD,balanceLKR},
            {new:true}
        );

        if(!wallet){
            return res.status(404).json({message:"Wallet not found"})
        }

        res.json(wallet);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});

// Delete a wallet 

router.delete('/:walletId',async(req,res)=>{
    try {
        const wallet = await Wallet.findOneAndDelete(
            {walletId:req.params.walletId});
         if(!wallet){
            return res.status(404).json({message:"Wallet not found"});
         }   
         res.json({message:"Wallet deleted Successfully!"});   
    } catch (error) {
       res.status(500).json({message:error.message});  
    }
});



module.exports = router;