import { PutObjectCommand } from "@aws-sdk/client-s3";
import mongoose from 'mongoose';
import { s3, S3_BUCKET } from "../config/s3.config.js";
import crypto from "crypto";
import path from "path";
//import * as userService from '../services/user.service.js';
import * as userModel from '../models/user.model.js';

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const file = req.file;
        const fileExt = path.extname(file.originalname);
        const randomName = crypto.randomBytes(16).toString("hex") + fileExt;
        // Upload parameters
        const params = {
            Bucket: S3_BUCKET,
            Key: `users/${randomName}`, // Folder inside bucket
            Body: file.buffer,
            ContentType: file.mimetype,
            //ACL: "public-read", // optional: makes file publicly accessible?
        };
        const result = await s3.send(new PutObjectCommand(params));
        const imageUrl = `https://${S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        const user = await userModel.getByEmail(req.user.email);
        user.image = imageUrl;
        await userModel.set(user);
        // const imageUrl = `/uploads/${req.file.filename}`;
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
