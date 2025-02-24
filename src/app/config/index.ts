import dotenv from 'dotenv'
dotenv.config()


export const config={
    port:process.env.PORT,
    db_url:process.env.DB_URL,
    saltRounds:process.env.SALTROUND,
    cloudinary_name:process.env.Cloudinary_Name,
    cloudinary_api:process.env.Cloudinary_Api,
    cloudinary_secret:process.env.Cloudinary_Secret,
    assessToken:process.env.ACCESS_Token,
    assessTokenExpireIn:process.env.ACCESS_EXPIRESIN
}