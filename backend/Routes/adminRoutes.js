const express = require('express');
const router = express.Router();
const {SignUp,Login,getallpendings,getAllApprovedMembers,approveUser,deniedUser, 
       logout, createEvent, fetchEvents, createMember, editEvent, deleteEvent, 
       fetchMembers,editMember,deleteMember} = require('../Controllers/adminController');

const {isAuthenticated} = require('../Middlewares/isAuthenticated');
const  {authorizeRoles}=require('../Middlewares/isAuthorization');

router.post("/SignUp",SignUp);
router.get("/getallpendings",isAuthenticated,authorizeRoles("admin"),getallpendings);
router.get("/getallapprovedmembers",isAuthenticated,authorizeRoles("admin","member"),getAllApprovedMembers);
router.patch("/approveUser/:id",isAuthenticated,authorizeRoles("admin","member"),approveUser);
router.delete("/deniedUser/:id",isAuthenticated,authorizeRoles("admin","member"),deniedUser);
router.post("/Login",Login);
router.get("/Logout",logout);
router.post("/createEvent",isAuthenticated,authorizeRoles("admin"),createEvent);
router.patch("/editEvent/:id",isAuthenticated,authorizeRoles("admin"),editEvent);
router.delete("/deleteEvent/:id",isAuthenticated,authorizeRoles("admin"),deleteEvent);
router.get("/fetchEvents",fetchEvents);
router.get("/fetchMembers",fetchMembers);
router.post("/createMember",isAuthenticated,authorizeRoles("admin"),createMember);
router.patch("/editMember/:id",isAuthenticated,authorizeRoles("admin"),editMember);
router.delete("/deleteMember/:id",isAuthenticated,authorizeRoles("admin"),deleteMember);


module.exports=router;