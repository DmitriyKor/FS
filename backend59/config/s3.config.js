import { S3Client } from "@aws-sdk/client-s3";

export var s3;
export var S3_BUCKET;

export const configureS3 = () => {
    console.log('Configuring S3Client with key: ', process.env.AWS_ACCESS_KEY_ID);
    s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    S3_BUCKET = process.env.AWS_S3_BUCKET;
}