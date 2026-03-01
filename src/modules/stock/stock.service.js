import mongoose from "mongoose";
import { Product } from "../product/product.model";
import { StockMovement } from "./stockMovement.model";

export const processStockMovement = async ({
    productId,
    organizationId,
    type,
    quantity,
    userId,
}) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const product = await Product.findOne({
            _id: productId,
            organization: organizationId,
        }, null, { session });

        if (!product) {
            throw new Error("Product not found");
        }
        if (type === "OUT" && product.quantity < quantity) {
            throw new Error("Insufficient stock");
        }
        if (type === "IN") {
            product.quantity += quantity;
        } else {
            product.quantity -= quantity;
        }
        await product.save({ session });

        await StockMovement.create(
            [{
                product: productId,
                Organization: organizationId,
                type,
                quantity,
                perFormedBy: userId,
            },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();
        return product;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};