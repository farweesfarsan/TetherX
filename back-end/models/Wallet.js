const mongoose = require('mongoose');

const generateWalletId = ()=>{
    const numbers = Math.floor(1000 + Math.random() * 9000); //Generates a 4 digit number
    // const characters = Math.random().toString(36).substring(2,4).toUpperCase(); // Generates 2 random characters
    return `WN${numbers}`;
}

const walletSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    walletId:{
        type:String,
        required:true,
        default:generateWalletId()
       
    },

    balanceUSD:{
        type:Number,
        default:100
    },

    balanceLKR:{
        type:Number,
        default:0
    },

    transactionHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Transaction'
        }
    ]
});

module.exports = mongoose.model('Wallet',walletSchema);