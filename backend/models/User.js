const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    
    email :{
        type:String,
        required:true,
        unique:true
    },
     
    role:{
        type:String,
        required:true,
        enum:["Seller","Buyer"],
        required:true
    },

    sellers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',
        
    },

    buyers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Buyer',  
    },

    balanceUSD:{
        type:Number,
        default:0.0,
    },

    hasClaimedBonus:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('User', userSchema);