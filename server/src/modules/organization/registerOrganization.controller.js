import bcrypt from 'bcrypt';
import { User } from '../user/user.model.js';
import { Membership } from '../membership/membership.model.js';
import { organization } from './organization.model.js';



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
    const existingOrg = await organization.findOne({ name: organizationName });
    if (existingOrg) {
      return res.status(400).json({ message: 'Organization with this name already exists' });
    }

    // Create organization
    const org = await organization.create({ name: organizationName });

    

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
      organization: org._id,
      user: user._id,
    });

  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: 'Error registering user',
    });
  }
};