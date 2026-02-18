import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { notFound} from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

export default app;