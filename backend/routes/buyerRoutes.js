const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const sellerMiddleWare = require('../middleware/sellerMiddleware');
 const buyerMiddleWare = require('../middleware/buyerMiddleware');

// const Seller = mongoose.model('Seller');
const Buyer = mongoose.model('Buyer');
const User = mongoose.model('User');

router.post('/addNewBuyer', async (req, res) => {
    const { firstName, lastName, email, contact, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const buyer = new Buyer({
            firstName,
            lastName,
            email,
            contact,
            password:hashedPassword  
        });

        await buyer.save();

        // Save user details in User schema as well   
       const user = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        role:'Buyer'
     })

    await user.save();
    
        res.send({ message: 'Buyer Registered Successfully!' });
    } catch (error) {
        console.log('Database error', error);
        res.status(422).send({ error: error.message });
    }
});

router.post('/buyerLogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const buyer = await Buyer.findOne({ email });
        if (!buyer) {
            return res.status(401).json({ error: "Buyer not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, buyer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ buyerID: buyer._id, role:'Buyer'}, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.log('Database Error', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//  router.get('/loggedUserBio',buyerMiddleWare, async(req,res)=>{
//     try {

//         const buyerID = req.sellerID;
//         const buyer = await Seller.findById(buyerID);

//         if(!buyer){
//           return  res.status(404).json({error:"Buyer not found"});
//         }

//         res.json({
//             firstName:buyer.firstName,
//             lastName:buyer.lastName,
//             email:buyer.email,
//             contact:buyer.contact,
//             password:buyer.password
           
//         });
        
//     } catch (error) {
//         console.error('Error fetching user Details ',error);
//         res.status(500).json({error:"Internal Server Error"});
//     }
//  })

module.exports = router;