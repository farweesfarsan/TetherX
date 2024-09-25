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
    references: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true // This will automatically add `createdAt` and `updatedAt` fields
});

// Create and export the model using mongoose.model
module.exports = mongoose.model('Transaction', transactionSchema);