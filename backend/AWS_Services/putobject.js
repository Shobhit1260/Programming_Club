const { PutObjectCommand, S3Client ,GetObjectCommand,DeleteObjectCommand,DeleteObjectsCommand, HeadObjectCommand } =require( "@aws-sdk/client-s3");
const { getSignedUrl } =require( "@aws-sdk/s3-request-presigner");
const {v4 :uuidv4} =require("uuid");
const Media=require("../Models/media");
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require("dotenv");
const path = require('path');
const fs=require('fs');

dotenv.config();


const pathtoUpload=path.join(__dirname,'uploads');
if(!fs.existsSync(pathtoUpload)){
  fs.mkdirSync(pathtoUpload, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathtoUpload); 
  },
  filename: (req, file, cb) => {
    const cleanedOriginalName = file.originalname.trim();
    const uniqueName = `${uuidv4()}-${cleanedOriginalName}`;
    cb(null, uniqueName); 
  }
});
const upload = multer({ storage });

// @ts-ignore
const s3Client = new S3Client({ 
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY,
    },
     });

exports.uploadMediatoS3=[ upload.fields([
  {"name":"media","maxCount":1},
  {"name":"thumbnail","maxCount":1}
]),
async (req, res, next) => {
try{
   const mediaFile=await req.files.media[0];
  
  if (!mediaFile) {
        return res.status(400).json({ message: "Media file not found" });
    }
  const mediaS3Key = `media/${mediaFile.filename}`;  
  const mediaStream = fs.createReadStream(mediaFile.path);
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: mediaS3Key,
      Body: mediaStream,
      ContentType: mediaFile.mimetype,
    })
   )

   fs.unlink(mediaFile.path, (err) => {
        if (err) console.error("Error deleting media file:", err);
    });
  
  const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;  
  let thumbnailS3Key = ''; 
  if (thumbnailFile) {
      thumbnailS3Key = `thumbnails/${thumbnailFile.filename}`;
      const thumbStream = fs.createReadStream(thumbnailFile.path);
      await s3Client.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: thumbnailS3Key,
              Body: thumbStream,
              ContentType: thumbnailFile.mimetype,
      })
    )}
  if (thumbnailFile) {
  fs.unlink(thumbnailFile.path, (err) => {
     if (err) console.error("Error deleting thumbnail file:", err);
  });
  }

   req.s3Key = mediaS3Key;
   req.thumbnailKey = thumbnailS3Key||'';
   next();
}
catch(error){
  console.error("Error in multer upload:", error);
}
}];

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
        const command1 = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: media.s3Key,
            ResponseContentDisposition: 'attachment'
        });
        // Verify object exists before generating signed URL to provide clearer errors
        try {
          await s3Client.send(new HeadObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: media.s3Key }));
        } catch (headErr) {
          console.error('HeadObject failed for', media.s3Key, headErr);
          return res.status(404).json({ success: false, message: 'Media object not found in S3', error: headErr.message || headErr });
        }

        const downloadURLforMedia = await getSignedUrl(s3Client, command1, { expiresIn: 3600 });
        console.log("Generated download URL:", downloadURLforMedia);
        // Only generate a thumbnail signed URL when thumbnailKey exists
        let downloadURLforThumbnail = null;
        if (media.thumbnailKey) {
          try {
            const command2 = new GetObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: media.thumbnailKey,
            });
            downloadURLforThumbnail = await getSignedUrl(s3Client, command2, { expiresIn: 3600 });
          } catch (thumbErr) {
            console.warn('Failed to generate thumbnail signed URL for', media._id, thumbErr);
            downloadURLforThumbnail = null;
          }
        }

        return res.status(200).json({
          success: true,
          downloadURLforMedia: downloadURLforMedia,
          downloadURLforThumbnail: downloadURLforThumbnail,
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
    return res.status(204).json({
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

    res.status(204).json({ message: "Bulk media deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Bulk delete failed", error: err });
  }
};

