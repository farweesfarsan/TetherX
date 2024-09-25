const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware2 = async(req,res,next)=>{
    const authHeader = req.header("Authorization");

    if(!authHeader){
        return res.status(401).json({error:"Unauthorized Token Provided"});
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({error:"Token not Provided"});
    }

    try {
        const decode = jwt.verify(token,process.env.jwt_secret);
        req.user = {email:decode.email,role:decode.role};
        next();
    } catch (error) {
        console.log("Authentication Error",error);
        return res.status(401).json({error:"Invalid Token"});
    }
}

module.exports = authMiddleware2;