import mongoose from 'mongoose';
import { env } from "./env.js";
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
    try {

       const uri = env.nodeEnv === "test" ? env.mongoUriTest : env.mongoUri;

        await mongoose.connect(uri);
        console.log("ENV:", env.nodeEnv);
        console.log("MONGO_URI:", env.mongoUri);
        console.log("MONGO_URI_TEST:", env.mongoUriTest);

      
    logger.info(
      `MongoDB connected (${env.nodeEnv})`
    );

  } catch (error) {
    logger.error("MongoDB connection error:", error);

    if (env.nodeEnv !== "test") {
      process.exit(1);
    }

    throw error;
  }
};
