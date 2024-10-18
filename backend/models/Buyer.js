const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const buyerSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    contact:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    walletId:{
        type:String,
        ref:"Wallet"
    }

});

module.exports = mongoose.model('Buyer',buyerSchema);