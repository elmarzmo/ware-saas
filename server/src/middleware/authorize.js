export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.membership.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};