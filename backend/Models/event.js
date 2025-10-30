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
   date:{
    type:Date,
    default:Date.now(),
   },
   time:{
    type:String,
    required:true,
   },
   status:{
    type:String,
   },
   googleFormLink:{
    type:String,
   }
})
module.exports=mongoose.model("Event",eventSchema);
