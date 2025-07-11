const express= require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB = require("./config/database");
const routes=require("./Routes/adminRoutes");
const routesupload=require("./Routes/uploadRoutes")
const routesleaderboard=require("./Routes/leaderboradRoutes");
const cookieParser=require("cookie-parser");
const app= express();
dotenv.config();

const port=process.env.PORT||4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(cookieParser());
app.use("/v1",routes);
app.use("/v1",routesupload);
app.use("/",routesleaderboard);



connectDB().then(() => {
    console.log("connection to the database is successful");
    app.listen(port, () => console.log(`the Server is running on the port http://localhost:${port}`));
}).catch((err) => {
    console.error("Database cannnot be connected: " + err.message);
});


