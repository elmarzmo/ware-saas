import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { notFound} from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

import { register } from './modules/auth/autho.controller.js';
import { login } from './modules/auth/autho.controller.js';

import testRoutes from './modules/test/test.routes.js';

import productRoutes from './modules/product/product.routes.js';
import stockRoutes from './modules/stock/stock.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';

import { scheduleLowStockCheck } from './jobs/lowStock.queue.js';


const app = express();
app.use("/api/test", testRoutes);


// Schedule the low stock check to run every hour
scheduleLowStockCheck();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

export default app;