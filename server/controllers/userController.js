// Handles user-related logic like searching for users.
import User from '../models/User.js';

export const getUsers = async (req, res, next) => {
    try {
        const currentUserId = req.user ? req.user._id : null;
        
        // Get all users except the current user
        const users = await User.find(
            currentUserId ? { _id: { $ne: currentUserId } } : {}
        ).select('fullName profilePic online createdAt');

        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id).select('fullName profilePic online email createdAt');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const searchUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { fullName: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};
  try {
    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } }) // Exclude current user
      .select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.username = req.body.username || user.username;
            if (req.file) {
                // The path should be accessible by the frontend
                user.profilePicture = `/${req.file.path.replace(/\\/g, "/")}`;
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                profilePicture: updatedUser.profilePicture,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};