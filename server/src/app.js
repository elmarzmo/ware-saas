import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { notFound} from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

import { login } from './modules/auth/autho.controller.js';

import testRoutes from './modules/test/test.routes.js';

import productRoutes from './modules/product/product.routes.js';
import stockRoutes from './modules/stock/stock.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';

import analyticsRoutes from './modules/analytics/analytics.route.js';
import userRoutes from './modules/user/user.routes.js';

import { apiLimiter } from './middleware/rateLimiter.js';
import registerUser from './modules/organization/registerOrganization.route.js';

const app = express();


// Middleware
app.use(helmet());
/*
app.use(cors({ origin: "'https://d3tgxl8tbyiz3f.cloudfront.net'", 
    credentials: true
}));*/
app.use(cors({}));
app.use(express.json());
app.use(morgan("dev"));

// Routes

app.use("/api/test", testRoutes);

app.use("/api", apiLimiter); // Apply rate limiter to all API routes

app.use("/api/analytics", analyticsRoutes);

//app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

app.use("/api/organizations", registerUser);

app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
