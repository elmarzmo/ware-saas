import { StockMovement } from "../stock/stockMovement.model.js";

export const  topMovingProducts = async (req, res) => {
    try {
        const organizationId = req.organization._id;
        
        const topProducts = await StockMovement.aggregate([
            { $match: { organization: organizationId } },
            { $group: { _id: "$product", totalProductsMoved: { $sum: "$quantity" } } },
            { $sort: { totalProductsMoved: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            { $project: {
                    _id: 0,
                    productId: "$_id",
                    name: "$productDetails.name",
                    sku: "$productDetails.sku",
                    totalProductsMoved: 1
                }
            }
        ]);
        res.json(topProducts);
    } catch (error) {   
        res.status(500).json({ message: "Server error" });
    }
};

export const mostActiveUsers = async (req, res) => {
    try {
        const organizationId = req.organization._id;
        const activeUsers = await StockMovement.aggregate([
            { $match: { organization: organizationId } },
            { $group: { _id: "$perFormedBy", totalMovements: { $sum: 1 } } },
            { $sort: { totalMovements: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },  
            { $unwind: "$userDetails" },
            { $project: {
                    _id: 0,
                    userId: "$_id",
                    name: "$userDetails.name",
                    email: "$userDetails.email",
                    totalMovements: 1
                }
            }
        ]);
        res.json(activeUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
};

export const stockTrends = async (req, res) => {
    try {
        const organizationId = req.organization._id;
        const trends = await StockMovement.aggregate([
            { $match: { organization: organizationId } },
            { $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalMoved: { $sum: "$quantity" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            { $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalMoved: 1
                }
            }
        ]);
        res.json(trends);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
};

