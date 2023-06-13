const jwt=require('jsonwebtoken');
const userSchema = require('../models/userModel');

//verify token
const signInMiddleware=(req,res,next)=>{
    try {
        const verify=jwt.verify(req.headers.authorization, process.env.Secret_Key);
        req.user=verify;
        next();
    } catch (error) {
        console.log(`middleware  ->  ${error}`)
        res.send("Invalid token")
    }
};

module.exports={signInMiddleware};