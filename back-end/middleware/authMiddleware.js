const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Seller = require('../models/Seller');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userID).select('-password');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // If the user's role is 'Seller', fetch the seller data and walletId
        if (user.role === 'Seller') {
            const seller = await Seller.findById(user.sellers);
            if (!seller) {
                return res.status(404).json({ error: "Seller not found" });
            }
            req.seller = seller; // Attach seller data to the request object
            req.sellerWalletId = seller.walletId; // Attach the walletId to the request object
            req.firstName = seller.firstName;
            req.lastName = seller.lastName;
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ error: "Invalid token" });
    }
};


const checkRequiredRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied. Insufficient role." });
    }
    next();
};

module.exports = { authMiddleware, checkRequiredRole };
