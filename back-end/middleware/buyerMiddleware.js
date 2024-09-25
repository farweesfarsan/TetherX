const jwt = require('jsonwebtoken');
require('dotenv').config();

const buyerMiddleWare = (allowedRoles) => (req,res,next) =>{

    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"Token not provided"})
    }

    try {
        const decode = jwt.verify(token,process.env.jwt_secret);

        req.buyerID = decode.buyerID;
        next();
    } catch (error) {
        console.error('Authentication error',error);
        return res.status(401).json({error:"Invalid Token"});
    }
}

module.exports = buyerMiddleWare;
