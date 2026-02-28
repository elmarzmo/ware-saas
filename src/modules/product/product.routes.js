import express from "express";
import { protect } from "../../middleware/authoMiddleware.js";
import { authorize } from "../../middleware/authorize.js";
import {createProduct, getProducts, getProductById, updateProduct ,deleteProduct } from "./product.controller.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);
router.put("/:id", protect, authorize("admin", "manager"), updateProduct);
router.delete("/:id", protect, authorize("admin", "manager"), deleteProduct);

export default router;