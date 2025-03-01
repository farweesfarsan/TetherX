const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Seller = mongoose.model('Seller');
const User = mongoose.model('User');
const Wallet = mongoose.model('Wallet');
const {authMiddleware,checkRequiredRole} = require('../middleware/authMiddleware');

router.post('/addNewSeller', async (req, res) => {
    const { firstName, lastName, email, contact, password, balanceUSD, balanceLKR } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const seller = new Seller({
            firstName,
            lastName,
            email,
            contact,
            password: hashedPassword,
            // We will assign wallet after creating it
        });

        await seller.save();

        // Create a wallet for the new seller
        const newWallet = new Wallet({
            user: seller._id,
            balanceUSD,
            balanceLKR
        });

        const savedWallet = await newWallet.save();

        // Save user details in User schema as well   
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'Seller',
            walletId: savedWallet.walletId
        });

        await user.save();

        res.send({ message: 'Seller Registered Successfully!' });
    } catch (error) {
        console.log('Database error', error);
        res.status(422).send({ error: error.message });
    }
});

router.get('/getAllSellers', async (req, res) => {
    try {
        const sellers = await User.find({ role: 'Seller' })
            .populate({
                path: 'walletId',
                select: 'balanceUSD' // Only include balanceUSD from the Wallet schema
            })
            .populate({
                path: '_id', // Assuming the User _id corresponds to the Seller's ObjectId
                model: 'Seller', // Specify the Seller schema
                select: '_id' // Only include the ObjectId from the Seller schema
            })
            .select('firstName lastName email'); // Select only necessary fields from User

        // Format the response to include only necessary fields
        const formattedSellers = sellers.map(seller => ({
            firstName: seller.firstName,
            lastName: seller.lastName,
            email: seller.email,
            balanceUSD: seller.walletId.balanceUSD,
            sellerId: seller._id // Seller ObjectId
        }));

        res.send(formattedSellers);
    } catch (error) {
        console.log('Error fetching sellers:', error);
        res.status(500).send({ error: error.message });
    }
});
router.post('/userLogin', async(req,res)=>{
    const {email,password} = req.body;

    try{
        // Find the user by email in the User schema
        const user = await User.findOne({email});

        // If the user is not found, return an error
        if (!user){
            return res.status(401).json({error:'User not found'});
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({error:'Invalid Password'});
        }

        // Determine the user's role
        const role = user.role;   // This will be either 'Seller' or 'Buyer'

        const token = jwt.sign({userID:user._id, role:role},process.env.JWT_SECRET,{
             expiresIn:"30m"
        });

        // res.cookie('auth%20token',token,{httpOnly:true, maxAge:10 * 60 * 1000});
        res.json({token,role});

    } catch(error){
        console.log('Database Error', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.get('/loggedUserBio', authMiddleware, checkRequiredRole(['Seller', 'Buyer']), async (req, res) => {
    try {
        const userID = req.user._id;
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            walletId: user.walletId
        });

    } catch (error) {
        console.error('Error fetching user details ', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/sellerDetails/:userId',async(req,res)=>{
    try {
        const userId = req.params.userId;
        const seller = await Seller.findOne({_id:userId});

        if(!seller){
            return res.status(404).json({success: false, message: 'Seller not found' });
        }

        return res.status(200).json({success: true,
            sellerName: `${seller.firstName} ${seller.lastName}`})
        
    } catch (error) {
        console.error('Error fetching seller:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
    }
})

 router.get('/userLogout',async(req,res,next)=>{
    res.status(200).json({message:"User logged out successfuly!"});
 })

module.exports = router;