const mongoose=require("mongoose");
const User=require("../Models/user.js")
const {sendToken}=require("../Utils/sendToken")
const Event = require("../Models/event.js");

exports.SignUp=async(req,res)=>{
  try{
    const{email,password,username}=req.body; 
    const member= await User.create({username,email,password});
    res.status(200).json({
      success:true,
      role:member.role,
      message:"Signedup successfully! and login after 24 hrs."
    }); 
    }
  catch(error){
      console.log("error:",error);
      res.status(500).json({
          succes:false,
          error:error,
          message:"registration is unsuccessful!"
      })
  }

}

exports.getallpendings=async(req,res)=>{
  try{
   const pendingUsers=await User.find({status:"pending"});
   res.status(200).json({
    success:true,
    count:pendingUsers.length,
    pendingUsers
   })
  }
  catch(error){
    console.log("error:",error);
    res.status(200).json({
      success:false,
      message:"internal server error", 
    })
  }
}


exports.approveUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(
        id,
        {$set:{ role: "member", status: "approved" }},
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
     res.status(200).json({
          success: true,
          message: "User approved to be a member",
        });

    } catch (error) {
      console.error("Error approving user:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error while approving user",
      });
    }
  }
  
exports.getAllApprovedMembers = async (req, res) => {
    try {
      const approvedMembers = await User.find({ status: "approved", role: "member" });
      res.status(200).json({
        success: true,
        count: approvedMembers.length,
        approvedMembers,
      });
    } catch (error) {
      console.error("error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  

exports.deniedUser=async(req,res)=>{
  try{
  const {id}=req.params;
  const user=await User.findByIdAndDelete(id);
  if(!user) {
    return res.status(404).json({
      success:false,
      message:"user not found",
    })
  }
  res.status(200).json({
   success:true,
   message:"user denied for to be a member"
  })
  }
  catch(error){
    console.log("error:",error);
    res.status(500).json({
      success: false,
      message: "Server error while denying user",
    });
  }
}
// how to inform that user's request is denied?how write the code for that?

exports.Login=async(req,res)=>{
  try{
    const{username,email,password}=req.body; 
    const user=await User.findOne({email});
    if(!user){ 
      return res.status(400).json({
             success:false,
             message:"username or password invalid"
    })
  }
    const isMatched=await user.matchPassword(password);
    if(!isMatched){
      return res.status(400).json({
        success:false,
        message:"username or password invalid"
      })  
    }
   if(user.status!=="approved" ){
    return res.status(400).json({
      success:false,
      message:"you r not approved for a member "
    })  
   }   
   sendToken(user,res,"member loggedin successfully!")
}
  catch(error){
      console.log("error:",error);
  }
}

exports.logout=async(req,res)=>{
  try{
      res.clearCookie("tkn", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "Strict",
      });
      res.status(200).json({ 
        success:true,
        message: "Logged out successfully"
       });
  }
  catch{
    res.status(500).json({ message: "internal server error" });
  }
}

exports.createEvent=async(req,res)=>{
     const {title,description,date,status}=req.body;
     const event = await Event.create({title,description,date,status});
     res.status(200).json({
       success:true,
       event,
       message:"event created succesfully",
     })
}

exports.fetchEvent=async(req,res)=>{
   const events=await Event.find();
   res.status(200).json({
      success:true,
      events:events.length,
      message:"events are successfully fetched."
   })
}