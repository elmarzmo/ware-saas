import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Membership } from "../modules/membership/membership.model.js";
import { logger } from "../utils/logger.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, env.jwtSecret);
    //console.log("Decoded:", decoded);

    const membership = await Membership.findOne({
      user: decoded.userId,
      organization: decoded.organizationId,
    }).populate("user").populate("organization");

    if (!membership) {
      return res.status(401).json({ message: "Membership not found" });
    }

    req.user = membership.user;
    req.organization = membership.organization;
    req.membership = membership;

    next();

  } catch (error) {
    logger.error(error);
    return res.status(401).json({ message: "Token invalid" });
   
  }
};