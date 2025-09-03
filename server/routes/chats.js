// Defines routes for creating and fetching chats.
import express from 'express';
import { accessChat, fetchChats } from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, accessChat).get(protect, fetchChats);

export default router;