const { PutObjectCommand, S3Client ,GetObjectCommand,DeleteObjectCommand,DeleteObjectsCommand } =require( "@aws-sdk/client-s3");
const { getSignedUrl } =require( "@aws-sdk/s3-request-presigner");
const {v4 :uuidv4} =require("uuid");
const Media=require("../Models/media");
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require("dotenv");
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// @ts-ignore
const s3Client = new S3Client({ 
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY,
    },
     });

exports.uploadMediatoS3=[ upload.single("media"),
    async (req,res,next)=>{ 
    try{
        const file = req.file;   
        console.log("file:",file);
        if(!file){
            return res.status(400).json({message:"file not found"});
        }
        const fileKey=`${Date.now()}-${file.originalname}`;
        const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME, 
        Key:`uploads/media/${fileKey}`,
        Body: file.buffer,
        ContentType:file.mimetype,
        });
      await s3Client.send(command);  
      const uploadURL=await getSignedUrl(s3Client,command);
      req.s3Key = `uploads/media/${fileKey}`;
      req.s3UploadURL = uploadURL;
      next();
    }
    catch(error){
        console.log("error:",error);
    }
 }
]

exports.DownloadMediafromS3=async(req,res)=>{
      const {id} = req.params;
      try{
        const media= await Media.findById(id);
        if(!media){
            return res.status(404).json({
                success: false,
                message: "Media not found",
            });
        }
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: media.s3Key,
        });
        const downloadURL = await getSignedUrl(s3Client, command);
        res.status(200).json({
            success: true,
            downloadURL: downloadURL,
        });
      }
      catch(error){
        console.error("Error generating download URL:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate download URL",
        });
      }
}

exports.DeleteMedia = async(req,res)=>{
  try{
    const media=await Media.findById(req.params.id);
    if(!media)
      return res.status(404).json({
      success:false,
      message:"Media not found",
     });
   
    await s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: media.s3Key,
    }));

    await media.deleteOne(); 
    return res.status(200).json({
      success: true,
      message: "Media deleted successfully",
    });
    }
    catch(error){
       console.error("Errror deleting media:",error);
       return res.status(500).json({
        success:false,
        message:"Failed to delete media",
       })
    }     
}

exports.DeleteMultipleMedia=async(req,res)=>{
  try {
    const { mediaIds } = req.body;
    const mediaItems = await Media.find({ _id: { $in: mediaIds } });
    const objectsToDelete = mediaItems.map((media) => ({ Key: media.s3Key }));
    await s3Client.send(new DeleteObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Delete: { Objects: objectsToDelete, Quiet: false },
      }))
  
    await Media.deleteMany({ _id: { $in: mediaIds } });

    res.status(200).json({ message: "Bulk media deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Bulk delete failed", error: err });
  }
};

