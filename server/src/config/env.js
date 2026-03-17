import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    mongoUriTest: process.env.MONGO_URI_TEST,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV || 'development',
   
};