// Handles user-related logic like searching for users.
import User from '../models/User.js';

export const searchUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: 'i' } },
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