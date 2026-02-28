import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        sku: {
            type: String,
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
            index: true,
        },
    },
    { timestamps: true }
);

productSchema.index({ organization: 1, sku: 1 }, { unique: true });

export const Product = mongoose.model("Product", productSchema);