import { User } from "./user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ organization: req.organization._id }).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, organization: req.organization._id }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findOne({ _id: req.params.id, organization: req.organization._id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        await user.save();
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, organization: req.organization._id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        await user.remove();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email, organization: req.organization._id });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const user = new User({
            name,
            email,
            password,
            role,
            organization: req.organization._id,
        });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  
