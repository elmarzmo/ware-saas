import { Product } from "./product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, sku, quantity } = req.body;

        if (!name || !sku) {
            return res.status(400).json({ message: "Name and SKU are required" });
        }

        const product = await Product.create({
            name,
            sku,
            quantity,
            organization: req.organization._id,
        });

        res.status(201).json(product);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "SKU must be unique within the organization" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ organization: req.organization._id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            organization: req.organization._id,
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, sku, quantity } = req.body;
        const updateFields = {};
        if (typeof name === "string" && name.trim() !== "")
             {
                updateFields.name = name;
            }
        if (typeof sku === "string" && sku.trim() !== "") {
            updateFields.sku = sku;
        }

        if (typeof quantity === "number" && quantity >= 0) {
            updateFields.quantity = quantity;
        }
        
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, organization: req.organization._id },
            updateFields,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }   
        res.json(product);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "SKU must be unique within the organization" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            organization: req.organization._id,
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
};

