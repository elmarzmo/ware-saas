import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import { Membership } from "../membership/membership.model.js";

export const getUsers = async (req, res) => {
    try {
        const memberships = await Membership.find({ organization: req.organization._id })
            .populate("user", "-password")
            .lean();

        const users = memberships
            .filter((membership) => membership.user)
            .map((membership) => ({
                ...membership.user,
                role: membership.role,
            }));

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const membership = await Membership.findOne({
            user: req.params.id,
            organization: req.organization._id,
        }).populate("user", "-password");

        if (!membership || !membership.user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            ...membership.user.toObject(),
            role: membership.role,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const membership = await Membership.findOne({
            user: req.params.id,
            organization: req.organization._id,
        }).populate("user");

        if (!membership || !membership.user) {
            return res.status(404).json({ message: "User not found" });
        }

        membership.user.name = name || membership.user.name;
        membership.user.email = email || membership.user.email;

        if (role) {
            membership.role = role;
            membership.user.role = role;
        }

        await membership.user.save();
        await membership.save();

        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const membership = await Membership.findOne({
            user: req.params.id,
            organization: req.organization._id,
        });

        if (!membership) {
            return res.status(404).json({ message: "User not found" });
        }

        await Membership.deleteOne({ _id: membership._id });

        const remainingMemberships = await Membership.countDocuments({ user: req.params.id });
        if (remainingMemberships === 0) {
            await User.deleteOne({ _id: req.params.id });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const normalizedRole = ["admin", "manager", "employee"].includes(role) ? role : "employee";

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const existingMembership = await Membership.findOne({
                user: existingUser._id,
                organization: req.organization._id,
            });

            if (existingMembership) {
                return res.status(400).json({ message: "User already belongs to this organization" });
            }

            await Membership.create({
                user: existingUser._id,
                organization: req.organization._id,
                role: normalizedRole,
            });

            return res.status(201).json({ message: "User linked to organization successfully" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            role: normalizedRole,
            password: hashedPassword,
        });
        await user.save();

        await Membership.create({
            user: user._id,
            organization: req.organization._id,
            role: normalizedRole,
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  
