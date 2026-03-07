import express from 'express';
import {getDashboardData} from './dashboard.controller.js';
import { protect } from '../../middleware/authoMiddleware.js';
import { authorize } from '../../middleware/authorize.js';


const router = express.Router();

router.get("/stats", protect, authorize("admin", "Manager" ), getDashboardData);

export default router;
