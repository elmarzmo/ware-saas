import express from 'express';
import { protect } from '../../middleware/authoMiddleware.js';
import { authorize } from '../../middleware/authorize.js';

import { getUsers, getUserById, updateUser, deleteUser, createUser } from './user.controller.js';

const router = express.Router();

router.get("/", protect, authorize("admin"), getUsers);
router.get("/:id", protect, authorize("admin"), getUserById);
router.put("/:id", protect, authorize("admin"), updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);
router.post("/createUser", protect, authorize("admin"), createUser);

export default router;