import { processStockMovement } from "./stock.service.js";

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