import express from 'express';
import { protect } from '../../middleware/authoMiddleware.js';
import { authorize } from '../../middleware/authorize.js';
import { createStockMovement, getStockMovements } from './stock.controller.js';


const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createStockMovement);
router.get("/", protect, authorize("admin", "manager"), getStockMovements);

export default router;