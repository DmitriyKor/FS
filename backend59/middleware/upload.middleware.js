import { upload } from "../config/multer.config.js";

export const uploadSingleImageMdl = upload.single("image"); // field name = "image"
export const uploadMultipleImagesMdl = upload.array("images", 5); // up to 5 files
