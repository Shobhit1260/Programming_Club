const mongoose=require("mongoose");
const mediaSchema= new mongoose.Schema({
    fileName:{
        type:String,
        unique:true,
    },
    UploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
      },
    s3Key: {
        type: String,
        required: true,
    }, 
})

module.exports =  mongoose.model("Media",mediaSchema);