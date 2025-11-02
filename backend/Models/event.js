const mongoose =require("mongoose");

const registrationFieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  placeholder: { type: String },
  description: { type: String },
  validation: { type: String },
  options: { type: [String], default: [] },
}, { _id: false });

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
   },
   status:{
    type:String,
   },
   googleFormLink:{
    type:String,
   },
   useCustomForm: {
     type: Boolean,
     default: false,
   },
   registrationFields: {
     type: [registrationFieldSchema],
     default: [],
   }
})
module.exports=mongoose.model("Event",eventSchema);
