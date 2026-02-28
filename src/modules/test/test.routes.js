import express from 'express';
import { authorize } from '../../middleware/authorize.js';
import { protect } from '../../middleware/authoMiddleware.js';  

const router = express.Router();

router.get("/me", protect, (req, res) => {
    res.json({
        user: req.user.name,
        organization: req.organization.name,
        role: req.membership.role,  
    });

    });

router.get("/admin", protect, authorize("admin"), (req, res) => {
    res.json({
        message: "Welcome admin!",
    });
});

export default router;