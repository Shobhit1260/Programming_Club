const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");

exports.sendToken=(user,res,message)=>{
    const token= jwt.sign(
        {id:user._id},
        process.env.SECRET_KEY,
        { expiresIn: process.env.EXPIRY }
    )
    res.cookie("tkn", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict",
        maxAge:30 * 24 * 60 * 60 * 1000 
      });
    res.status(200).json({
        success:true,
        message,
        token
    })  
}