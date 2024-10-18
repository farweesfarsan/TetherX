const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {authMiddleware} = require('../middleware/authMiddleware');
const Seller = mongoose.model('Seller');
const Buyer = mongoose.model('Buyer');
const User = mongoose.model('User');
const Wallet = mongoose.model('Wallet');

router.post('/addSeller', async (req, res) => {
  try {
    const { firstName, lastName, email, password, contact } = req.body;

    // Check if the email already exists in the User collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the Seller first
    const seller = new Seller({
      firstName,
      lastName,
      email,
      contact,
      password: hashedPassword,
      // Leave userId empty for now
    });
    const savedSeller = await seller.save();

    // Now create and save the User, associating it with the seller
    const user = new User({
      email,
      role: 'Seller',
      sellers: savedSeller._id, // Save Seller's ID in User (optional)
    });
    const savedUser = await user.save();

    // Now update the Seller with the User's object ID
    savedSeller.userId = savedUser._id; // Assuming `userId` is the field to store the User ID in Seller schema
    await savedSeller.save(); // Save the updated seller

    // Create and save the Wallet for the new Seller
    const wallet = new Wallet({
      user: savedUser._id
      // balanceUSD: null,
      // balanceLKR: null
    });
    const savedWallet = await wallet.save();

    // Update the Seller with the walletId as well (if necessary)
    savedSeller.walletId = savedWallet.walletId;
    await savedSeller.save();

    res.json({
      user: savedUser,
      seller: savedSeller, // Include updated seller with userId and walletId
      wallet: savedWallet,
    });

  } catch (error) {
    console.log('Error is', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/usersLogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await User.findOne({ email });
        if (!users) {
            return res.status(401).json({ error: "User not found" });
        }

        let user;
        let storedPassword;
        const role = users.role; // Define the role variable here

        // Fetch the corresponding Seller or Buyer based on the user's role
        if (role === "Seller") {
            user = await Seller.findById(users.sellers);
            if (user) storedPassword = user.password;
        } else if (role === "Buyer") {
            user = await Buyer.findById(users.buyers);
            if (user) storedPassword = user.password;
        }

        if (!user) {
            return res.status(401).json({ error: "Invalid User" });
        }

        // Compare the password from the relevant schema
        const isPasswordValid = await bcrypt.compare(password, storedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Password" });
        }

        const token = jwt.sign({ userID: users._id, role: role }, process.env.JWT_SECRET, {
            expiresIn: "10m"
        });

        res.json({ token, role });
        console.log(`Logging in as ${role}`);

    } catch (error) {
        console.log("Error is", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router;