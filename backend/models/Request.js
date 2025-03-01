const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(

{
  sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },

  receiver : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },

  amount : {
    type : Number,
    required : true
  },

  description : {
    type : String,
    required : true
  },

  status : {
    type : String,
    default: 'Pending'
  }
},{
    timestamps : true
});

module.exports = mongoose.model('Request',requestSchema);

