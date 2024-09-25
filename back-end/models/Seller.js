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
       
    }
   
});

module.exports = mongoose.model('Seller', sellerSchema);