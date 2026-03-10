import "dot"
import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis.js';
import { connectDB } from '../config/db.js';
import { Product } from '../modules/product/product.model.js';

await connectDB();

const worker = new Worker('low-stock-queue', async job => {
    console.log('Running stock check ...');

    const lowStockProducts = await Product.find({ 
        $expr: { $lte: ["$quantity", "$lowStockThreshold"] }  });
    if (lowStockProducts.length > 0) {
            console.log('Low stock products detected:');
            lowStockProducts.forEach(product => {
                console.log(`- ${product.name} (ID: ${product._id}) has low stock: ${product.quantity}`);
            });
     }

        // Here you can implement notification logic (e.g., send email or push notification)
     else {
        console.log('No low stock products detected.');
     }
    }, { connection: redisConnection}
);

worker.on('completed', () => {
    console.log('Stock check completed');
});

worker.on('failed', (job, err) => {
    console.error('Stock check failed', err);
});