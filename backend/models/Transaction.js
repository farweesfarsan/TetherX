const mongoose = require('mongoose');

// Define the schema using mongoose.Schema, not mongoose.model
const transactionSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverName: {
        type: String, // Add receiver's name here
        required: true
    },
    references: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);