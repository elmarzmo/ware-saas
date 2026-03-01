import mongoose from "mongoose";
import { Organization } from "../organization/organization.model";

const stockMovementSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            index: true,
        },
        Organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: ['IN', 'OUT'],
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        perFormedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

export const StockMovement = mongoose.model("StockMovement", stockMovementSchema);
