// Defines user-related routes, like searching.
import express from 'express';
import { searchUsers } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { uploadProfilePic } from '../middleware/upload.js';
import { updateUserProfile } from '../controllers/userController.js'; // Import new controller



const router = express.Router();

router.route('/').get(protect, searchUsers);
router.route('/').get(protect, searchUsers);
router.route('/profile').put(protect, uploadProfilePic, updateUserProfile); // New route


export default router;