// Handles user registration and login logic.
import User from '../models/User.js';
import generateToken from '../utils/jwt.js';

export const registerUser = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    
    const user = await User.create({ fullName, email, password });
    if (user) {
      res.status(201).json({
        user: {
          _id: user._id, 
          fullName: user.fullName, 
          email: user.email, 
          profilePic: user.profilePic
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) { 
    next(error); 
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          _id: user._id, 
          fullName: user.fullName, 
          email: user.email, 
          profilePic: user.profilePic
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) { 
    next(error); 
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = { 
      _id: req.user._id, 
      fullName: req.user.fullName, 
      email: req.user.email, 
      profilePic: req.user.profilePic 
    };
    res.status(200).json(user);
  } catch(error) { 
    next(error); 
  }
};