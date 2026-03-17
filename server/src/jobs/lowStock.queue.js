import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const lowStockQueue = new Queue('low-stock-queue', {
    connection: redisConnection,
});

export const scheduleLowStockCheck = async (delay) => {
    await lowStockQueue.add('stock-check',
         {}, 
        {
         repeat: { 
        every: 60000 // Check every 60 seconds ( need to be changed to 1h after testing)
    },
     });
};
