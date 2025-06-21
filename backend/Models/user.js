const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true,
        unique:true,
        minLength:[6, 'Username must be at least 6 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile:{
       type:Number,
       required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ["admin", "member","normal"],
        default: "normal"
    },
    status: {
        type: String,
        enum: ["pending", "approved","denied"],
        default: "pending"
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  });


userSchema.methods.matchPassword=function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}

module.exports=mongoose.model("User",userSchema);


