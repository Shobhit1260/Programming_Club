const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");

exports.sendToken=(user,res,message)=>{
    const token= jwt.sign(
        {id:user._id},
        process.env.SECRET_KEY,
        { expiresIn: process.env.EXPIRY }
    )
    console.log("token:",token);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "Lax",
        maxAge:30 * 24 * 60 * 60 * 1000 
      });
    res.status(200).json({
        success:true,
        message,
        token
    })  
}