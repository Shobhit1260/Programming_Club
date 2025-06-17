const express=require('express');
const router=express.Router();
const Media=require("../Models/media.js");
const {authorizeRoles}=require("../Middlewares/isAuthorization");
const{isAuthenticated}=require("../Middlewares/isAuthenticated.js");
const {uploadMediatoS3, DownloadMediafromS3,DeleteMedia,DeleteMultipleMedia}=require("../AWS_Services/putobject.js");
const {entryindb, getAllMedia,UploadedBy}=require("../Controllers/upload.js");
router.post("/upload",isAuthenticated,authorizeRoles("admin","member"),uploadMediatoS3,entryindb);
router.get("/download/:id",DownloadMediafromS3);
router.delete("/delete/:id",isAuthenticated,authorizeRoles("admin","member"),DeleteMedia);
router.get("/getallmedia",getAllMedia);
router.get("/UploadedBy",isAuthenticated,authorizeRoles("admin"),UploadedBy);
router.delete("/delete",isAuthenticated,authorizeRoles("admin","member"),DeleteMultipleMedia);

module.exports=router;
