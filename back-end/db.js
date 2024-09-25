const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL).then(
    ()=>{
        console.log('connected successfully!');
    },

)
.catch((error)=>{
    console.log("Database connectivity error"+ error);
});