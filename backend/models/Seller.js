const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    walletId:{
        type:String,
        ref:"Wallet",
       
    },

    user: {  // Add this field if not already present
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
   
});

module.exports = mongoose.model('Seller', sellerSchema);