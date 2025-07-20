const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.auth=async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({error:"No token,authorization denied"});
        }
        const decode=jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user = await User.findById(decode.userId).select('-password');
        next();


        }catch (error) {
        res.status(401).json({error:'Token is not valid'})
        
    }
}