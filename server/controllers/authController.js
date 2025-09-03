// Handles user registration and login logic.
import User from '../models/User.js';
import generateToken from '../utils/jwt.js';

export const registerUser = async (req, res, next) => {
  // ... (logic remains the same)
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ username, email, password });
    if (user) {
      res.status(201).json({_id: user._id, username: user.username, email: user.email, profilePicture: user.profilePicture, token: generateToken(user._id)});
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) { next(error); }
};

export const loginUser = async (req, res, next) => {
  // ... (logic remains the same)
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({_id: user._id, username: user.username, email: user.email, profilePicture: user.profilePicture, token: generateToken(user._id)});
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) { next(error); }
};

export const getMe = async (req, res, next) => {
  // ... (logic remains the same)
  try {
    const user = { _id: req.user._id, username: req.user.username, email: req.user.email, profilePicture: req.user.profilePicture };
    res.status(200).json(user);
  } catch(error) { next(error); }
};