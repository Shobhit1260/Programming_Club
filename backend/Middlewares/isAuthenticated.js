const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const User=require("../Models/user");
exports.isAuthenticated=async(req,res,next)=>{
    const {tkn}=req.cookies;
    if(!tkn){
        return res.status(404).json({
            success:false,
            message:"token not found"
        })
    }
    try{
    const decoded=jwt.verify(tkn,process.env.SECRET_KEY);
    req.user=await User.findById(decoded.id);
    console.log("user authenticated:",req.user);
    next();
    }
    catch(error){
        console.log("error while authenticating:",error);
        return res.status(401).json({
            success:false,
            message:"token is not valid"
        })

    }

}