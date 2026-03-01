import express from 'express';
import { protect } from '../../middleware/authoMiddleware.js';
import { authorize } from '../../middleware/authorize.js';
import { createStockMovement } from './stock.controller.js';

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createStockMovement);

export default router;