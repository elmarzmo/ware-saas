import express from "express";
import { protect } from "../../middleware/authoMiddleware.js";
import { authorize } from "../../middleware/authorize.js";
import {createProduct, getProducts, getProductById, updateProduct ,deleteProduct, getLowStockProducts } from "./product.controller.js";
import { validate } from "../../middleware/validate.js";
import { createProductSchema } from "./product.validation.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "manager"), validate(createProductSchema), createProduct);
router.get("/low-stock", protect, getLowStockProducts);
router.get("/", protect,authorize("admin", "manager", "employee") ,getProducts);
router.get("/:id", protect, getProductById);
router.put("/:id", protect, authorize("admin", "manager"), updateProduct);
router.delete("/:id", protect, authorize("admin", "manager"), deleteProduct);


export default router;