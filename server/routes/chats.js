// Defines routes for creating and fetching chats.
import express from 'express';
import { createChat, getChats } from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createChat).get(protect, getChats);

export default router;