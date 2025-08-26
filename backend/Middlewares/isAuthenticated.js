const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const User=require("../Models/user");
exports.isAuthenticated=async(req,res,next)=>{
    try{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:"Authentication token not found in cookies",
        })
    }
    try{
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    req.user=await User.findById(decoded.id);
    next();
    }
    catch(error){
        console.error("JWT verification error:", error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error while authentication."
        })

    }
}
catch(error){
    console.error("Error while authentication",error);
}}