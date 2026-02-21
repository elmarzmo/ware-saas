import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model.js';
import { Membership } from '../membership/membership.model.js';
import { Organization } from '../organization/organization.model.js';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

/**
 * Register a new organization with an admin user
 */
export const register = async (req, res) => {
  try {
    const { organizationName, name, email, password } = req.body;

    if (!organizationName || !name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const existingOrg = await Organization.findOne({ name: organizationName });
    if (existingOrg) {
      return res.status(400).json({ message: 'Organization with this name already exists' });
    }

    // Create organization
    const org = await Organization.create({ name: organizationName });

    

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    

    // Create membership (admin role)
    await Membership.create({
      user: user._id,
      organization: org._id,
      role: 'admin',
    });

    res.status(201).json({
      message: 'Organization and admin user created successfully',
    });

  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: 'Error registering user',
    });
  }
};


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

    res.json({ token });

  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: 'Error logging in',
    });
  }
};
