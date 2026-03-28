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
