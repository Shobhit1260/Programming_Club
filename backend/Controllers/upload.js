const Media=require("../Models/media.js");
exports.entryindb=async(req,res)=>{
    try {
      const file= req.file;
      const User=req.user;
     
      const media = await Media.create({
          title: req.body.title || "",
          description:req.body.description || "",
          fileType:file.mimetype,
          fileSize:file.size,
          fileName: file.originalname,
          UploadedBy: User._id.toString(),
          s3Key: req.s3Key,
          thumbnailKey:req.body.thumbnailKey || "",
        });

        return res.status(200).json({
          success: true,
          message: "Media uploaded and saved",
          media,
        });
      } 
      catch (error) {
        console.error("DB Save Error:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to save media info to DB"
        });
      }
}

exports.getAllMedia = async (req, res) => {
  try {
    const mediaList = await Media.find();
    res.status(200).json({ mediaList });
  } catch (err) {
    res.status(500).json({ message: "Error fetching media list", error: err });
  }
};

exports.UploadedBy = async (req, res) => {
  try {
    const mediaList = await Media.find().populate("UploadedBy");
    res.status(200).json({ mediaList });
  } catch (err) {
    res.status(500).json({ message: "Error fetching media list", error: err });
  }
};
