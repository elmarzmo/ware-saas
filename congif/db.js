import monggoose from 'mongoose';
import { env } from "./env.js";
import { logger } from '..utils/logger.js';

export const connectDB = async () => {
    try {
        await monggoose.connect(env.mongoUri);
            logger.info('Connected to MongoDB');
        } catch (error) {
            logger.error('Error connecting to MongoDB', error);
            process.exit(1);
        }
    };

