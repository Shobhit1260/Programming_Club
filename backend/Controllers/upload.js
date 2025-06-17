const Media=require("../Models/media.js");
exports.entryindb=async(req,res)=>{
    try {
      const file= req.file;
      console.log("req.user:",req.user);
      const User=req.user;
      console.log("s3Key:",req.s3Key);
        const media = await Media.create({
          UploadedBy: User._id.toString(),
          fileName: file.originalname,
          s3Key: req.s3Key,
          uploadUrl: req.s3UploadURL,
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
