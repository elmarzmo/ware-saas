import app from './app.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';
import { env } from './config/env.js';

const start = async () => {
    await connectDB();

    app.listen(env.port, () => {
        logger.info(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });
};

start();