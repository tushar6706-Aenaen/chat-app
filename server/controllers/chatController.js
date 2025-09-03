// Handles logic for creating and managing chats.
import Chat from '../models/Chat.js';
import User from '../models/User.js';

export const getChats = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({
            participants: userId
        })
        .populate('participants', 'fullName profilePic online')
        .populate('lastMessage')
        .sort({ updatedAt: -1 });

        res.json(chats);
    } catch (error) {
        next(error);
    }
};

export const createChat = async (req, res, next) => {
    try {
        const { participantId } = req.body;
        const currentUserId = req.user._id;

        // Check if chat already exists
        const existingChat = await Chat.findOne({
            participants: { $all: [currentUserId, participantId] }
        });

        if (existingChat) {
            return res.json(existingChat);
        }

        // Create new chat
        const chat = await Chat.create({
            participants: [currentUserId, participantId]
        });

        await chat.populate('participants', 'fullName profilePic online');

        res.status(201).json(chat);
    } catch (error) {
        next(error);
    }
};

export const accessChat = async (req, res, next) => { 
    // Legacy function - kept for compatibility
    return createChat(req, res, next);
};

export const fetchChats = async (req, res, next) => { 
    // Legacy function - kept for compatibility
    return getChats(req, res, next);
};