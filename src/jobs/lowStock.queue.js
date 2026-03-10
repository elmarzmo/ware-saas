import { Qeue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const stockQueue = new Qeue('low-stock-queue', {
    connection: redisConnection,
});