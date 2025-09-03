// Defines user-related routes, like searching.
import express from 'express';
import { getUsers, getUserById, searchUsers } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getUsers);
router.route('/search').get(protect, searchUsers);
router.route('/:id').get(getUserById);

export default router;