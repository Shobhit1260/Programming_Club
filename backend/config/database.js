const mongoose=require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { MONGO_DB } = process.env;

const connectDB = async () => {
    await mongoose.connect(MONGO_DB);
}

module.exports = connectDB;
