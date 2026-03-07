import { Product } from "../product/product.model.js";
import { StockMovement } from "../stock/stockMovement.model.js";

export const getDashboardData = async (req, res) => {
    try {
        const organizationId = req.organization._id;

        // Get total products
        const totalProducts = await Product.countDocuments({ organization: organizationId });

        // Get total stock movements
        const stockAggregation = await StockMovement.aggregate([
            { $match: { Organization: organizationId } },
            { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
        ]);

        const totalStockQuantity = stockAggregation.length > 0 ? stockAggregation[0].totalQuantity : 0;
        
        const lowStockProducts = await Product.countDocuments({ organization: organizationId, $expr: { $lt: ["$quantity", "$lowStockThreshold"] } });

        const totalStockMovements = await StockMovement.countDocuments({ Organization: organizationId });

        res.json({
            totalProducts,
            totalStockQuantity,
            lowStockProducts,
            totalStockMovements,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};