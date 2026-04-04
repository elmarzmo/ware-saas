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
        const effectiveLimit = limitNumber > 0 ? limitNumber : 1;
        const effectivePage = pageNumber > 0 ? pageNumber : 1;
        const movements = await StockMovement.find(query)
            .populate("product", "name")
            .populate("perFormedBy", "name")
            .sort({ createdAt: -1 })
            .skip((effectivePage - 1) * effectiveLimit)
            .limit(effectiveLimit);
        const total = await StockMovement.countDocuments(query);

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const todayStatsAgg = await StockMovement.aggregate([
            {
                $match: {
                    ...query,
                    createdAt: { $gte: startOfDay, $lte: endOfDay },
                },
            },
            {
                $group: {
                    _id: "$type",
                    totalQuantity: { $sum: "$quantity" },
                    movementCount: { $sum: 1 },
                },
            },
        ]);
        const todayStats = {
            in: { quantity: 0, count: 0 },
            out: { quantity: 0, count: 0 },
        };
        todayStatsAgg.forEach(stat => {
            if (stat._id === "IN") {
                todayStats.in.quantity = stat.totalQuantity;
                todayStats.in.count = stat.movementCount;
            } else if (stat._id === "OUT") {
                todayStats.out.quantity = stat.totalQuantity;
                todayStats.out.count = stat.movementCount;
            }
        });

        res.json({
            total,
            page: effectivePage,
            pages: Math.ceil(total / effectiveLimit),
            data: movements,
            todayStats,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
