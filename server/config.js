import dotenv from 'dotenv'
dotenv.config({path: './.env'})

export default {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AVATAR_BUCKET: process.env.AVATAR_BUCKET,
    UPLOAD_AWS_KEY: process.env.UPLOAD_AWS_KEY,
    UPLOAD_AWS_SECRET: process.env.UPLOAD_AWS_SECRET,
    DB_URI: process.env.DB_URI,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
}