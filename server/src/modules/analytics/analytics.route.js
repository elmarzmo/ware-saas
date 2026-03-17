import express from 'express';
import { protect } from '../../middleware/authoMiddleware.js';
import { stockTrends, topMovingProducts, mostActiveUsers  } from './analytics.controller.js';

const router = express.Router();

router.get('/stock-trends',protect ,stockTrends);
router.get('/top-moving-products',protect, topMovingProducts);
router.get('/most-active-users', protect, mostActiveUsers);

export default router;