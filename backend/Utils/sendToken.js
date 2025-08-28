const jwt = require("jsonwebtoken");
const dotenv=require("dotenv");

exports.sendToken=(user,res,message)=>{
    const token= jwt.sign(
        {id: user._id, }
,        process.env.SECRET_KEY,
        { expiresIn: process.env.EXPIRY }
    )
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "None",
        maxAge:30 * 24 * 60 * 60 * 1000 
      });
    return res.status(200).json({
        success:true,
        message,
        token,
        role:user.role
    })  
}
