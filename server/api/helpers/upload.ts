import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";
import { CreateBucketRequest, BucketName } from 'aws-sdk/clients/s3';
import config from "../../config"

const BUCKET_NAME: BucketName = 'user-avatar-profile-photos'
//config.AVATAR_BUCKET

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.UPLOAD_AWS_KEY,
  secretAccessKey: process.env.UPLOAD_AWS_SECRET,
});

function createBucket() {
  const params: CreateBucketRequest = {
    Bucket: BUCKET_NAME,
  };

  s3.createBucket(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log("Bucket Created Successfully", data.Location);
  });
}

export async function generateUploadUrl () {    
    const id = uuidv4()
    const params = {
        Bucket: BUCKET_NAME,
        Key: id, 
        Expires: 60,
        ContentType: "image/jpeg"
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
    return uploadUrl
};
