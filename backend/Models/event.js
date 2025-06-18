const mongoose =require("mongoose");
const eventSchema= new mongoose.Schema({
   title:{
    type:String,
    required:true,
    unique:true,
   },
   description:{
     type:String,
     required:true,
   },
   Date:{
    type:Date,
    default:Date.now(),
   },
   status:{
    type:String,
   }
})
module.exports=mongoose.model("Event",eventSchema);
