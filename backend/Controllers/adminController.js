const mongoose=require("mongoose");
const User=require("../Models/user.js")
const {sendToken}=require("../Utils/sendToken")
const Event = require("../Models/event.js");
const MemberProfile=require("../Models/memberProfile.js")

exports.SignUp=async(req,res)=>{
  try{
    const{firstName,lastName,email,password,username,mobile}=req.body; 
    const duplicateEmailUser=await User.findOne({email});
    if(duplicateEmailUser){
      return res.status(409).json({
        success:false,
        message:"Email already Exists."
      })
    }
    const duplicateUsernameUser=await User.findOne({username});
    if(duplicateUsernameUser){
      return res.status(409).json({
        success:false,
        message:"Same UserName already Exists."
      })
    }
    const member= await User.create({firstName,lastName,email,password,username,mobile});
    res.status(201).json({
      success:true,
      message:"Registred successfully! and login after 24 hrs."
    }); 
    }
  catch(error){
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
    const{email,password}=req.body; 
    const user=await User.findOne({email});
    if(!user){ 
      return res.status(400).json({
             success:false,
             message:"email or password not found"
    })
  }
    const isMatched=await user.matchPassword(password);
    if(!isMatched){
      return res.status(400).json({
        success:false,
        message:"email or password invalid"
      })  
    }
   if(user.status!=="approved" ){
    return res.status(400).json({
      success:false,
      message:"you are not approved member "
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
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
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
  try{
     const {title,description,date,time,status,googleFormLink}=req.body;
     const dulpEvent=await Event.findOne({title});
     if(dulpEvent){
      return res.status(409).json({
        success:false,
        message:"Duplicate title not allowed."
      })
     }
     const event = await Event.create({title,description,date,time,status,googleFormLink});
     res.status(200).json({
       success:true,
       event,
       message:"event created succesfully",
     })
    }
    catch(error){
      res.status(500).json({ message: "internal server error" });    
    }
}

exports.editEvent=async(req,res)=>{
  try{
     const {title,description,date,status,googleFormLink}=req.body;
     const {id}=req.params;
     const event = await Event.findByIdAndUpdate(id,{
      $set:{title:title,description:description,date:date,status:status,googleFormLink:googleFormLink}
     },
     {new:true});
     res.status(201).json({
       success:true,
       event,
       message:"event edited succesfully",
     })
    }
    catch(error){
      res.status(500).json({ message: "internal server error" });    
    }
}

exports.deleteEvent=async(req,res)=>{
  try{
     const {id}=req.params;
     const event = await Event.findByIdAndDelete(id);
      if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
     res.status(200).json({
       success:true,
       event,
       message:"event deleted succesfully",
     })
    }
    catch(error){
      res.status(500).json({ message: "internal server error" });    
    }
}

exports.fetchEvents=async(req,res)=>{
  try{
   const events=await Event.find();
   res.status(200).json({
      success:true,
      events:events,
      count:events.length,
      message:"events are successfully fetched."
   })
  }
  catch(error){
      res.status(500).json({ message: "internal server error" });
  }
}



exports.createMember=async(req,res)=>{
  try{
   const{name,role,imageUrl}=req.body;
   const newMember=await MemberProfile.create({name,role,imageUrl});
   res.status(201).json({
        success:true,
        newMember,
        message:"member created succesfully",
   })
   }
  catch(error){
      res.status(500).json({ message: "internal server error" });  
    }
}


exports.editMember=async(req,res)=>{
  try{
    
     const {id}=req.params;
     const member = await MemberProfile.findByIdAndUpdate(id,{
      $set:req.body
     },
     {new:true,runValidators: true});

     if(!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
      res.status(201).json({
       success:true,
       member,
       message:"event edited succesfully",
     })
    }
    catch(error){
      res.status(500).json({ message: "internal server error" });    
    }
}

exports.deleteMember=async(req,res)=>{
  try{
     const {id}=req.params;
     const updatedMember = await MemberProfile.findByIdAndDelete(id);
      if (!updatedMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
     res.status(200).json({
       success:true,
       updatedMember,
       message:"member deleted succesfully",
     })
    }
    catch(error){
      res.status(500).json({ message: "internal server error" });    
    }
}

exports.fetchMembers=async(req,res)=>{
  try{
   const members=await MemberProfile.find();
   res.status(200).json({
      success:true,
      members:members,
      count:members.length,
      message:"events are successfully fetched."
   })
  }
  catch(error){
      res.status(500).json({ message: "internal server error" });
  }
}

// Admin: Get all users (no passwords)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Admin: Update a user's role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ["admin", "member", "normal"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role value',
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: { role } },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
      message: 'User role updated successfully',
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user role',
    });
  }
};
