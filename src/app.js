import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { notFound} from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

import { register } from './modules/auth/autho.controller.js';
import { login } from './modules/auth/autho.controller.js';

import testRoutes from './modules/test/test.routes.js';

const app = express();
app.use("/api/test", testRoutes);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

export default app;