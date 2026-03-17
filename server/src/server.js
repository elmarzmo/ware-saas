import app from './app.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';
import { env } from './config/env.js';

const start = async () => {
    await connectDB();

    if (env.nodeEnv !== 'test') {
        const { scheduleLowStockCheck } = await import('./jobs/lowStock.queue.js');
        await scheduleLowStockCheck();
    }

    app.listen(env.port, () => {
        logger.info(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });
};
if (env.nodeEnv !== 'test') {
    start();
}
export default app;
