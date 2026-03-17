import { processStockMovement } from "./stock.service.js";
import { StockMovement } from "./stockMovement.model.js";

export const createStockMovement = async (req, res) => {
    try {
        const { productId, type, quantity } = req.body;

        if (!productId || !type || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const updatedProduct = await processStockMovement({
            productId,
            organizationId: req.organization._id,
            type,
            quantity,
            userId: req.user._id,
        });
        res.status(201).json(updatedProduct);
    } catch (error) {
       console.log(error);
        res.status(400).json({ message: error.message });
    }
};

export const getStockMovements = async (req, res) => {
    try {
        const { page = 1, limit = 10, productId } = req.query;
        const query = { organization: req.organization._id };

        if (productId) {
            query.product = productId;
        }


        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const movements = await StockMovement.find(query)
            .populate("product", "name")
            .populate("perFormedBy", "name")
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const total = await StockMovement.countDocuments(query);

        res.json({
            
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: movements,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
