import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model.js';
import { Membership } from '../membership/membership.model.js';
import { organization } from '../organization/organization.model.js';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';



/**
 * Login user to a specific organization
 */
export const login = async (req, res) => {
  try {
    const { email, password, organizationId } = req.body;

    if (!email || !password || !organizationId) {
      return res.status(400).json({
        message: 'Email, password, and organizationId are required',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Check membership in that specific organization
    const membership = await Membership.findOne({
      user: user._id,
      organization: organizationId,
    }).lean();

    if (!membership) {
      return res.status(403).json({
        message: 'User does not belong to this organization',
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        organizationId: membership.organization,
        role: membership.role,
      },
      env.jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({token: token,
      role: membership.role,
     });

  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: 'Error logging in',
    });
  }
};
