const express = require('express');
const router = express.Router();
const {SignUp,Login,getallpendings,getAllApprovedMembers,approveUser,deniedUser, logout} = require('../Controllers/adminController')
const {isAuthenticated} = require('../Middlewares/isAuthenticated');
const  {authorizeRoles}=require('../Middlewares/isAuthorization');
router.post("/SignUp",SignUp);
router.get("/getallpendings",isAuthenticated,authorizeRoles("admin","member"),getallpendings);
router.get("/getallapprovedmembers",isAuthenticated,authorizeRoles("admin","member"),getAllApprovedMembers);
router.patch("/approveUser/:id",isAuthenticated,authorizeRoles("admin","member"),approveUser);
router.delete("/deniedUser/:id",isAuthenticated,authorizeRoles("admin","member"),deniedUser);
router.post("/Login",Login);
router.get("/Logout",logout);

module.exports=router;