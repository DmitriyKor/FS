export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // If you plan to store on cloud later, this is where you'd upload to S3/Cloudinary
    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      message: "Image uploaded successfully",
      file: {
        name: req.file.filename,
        type: req.file.mimetype,
        size: req.file.size,
        url: imageUrl,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};
