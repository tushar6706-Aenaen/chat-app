// Handles message-related operations
import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

export const getMessages = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user._id;

        // Find or create chat between users
        let chat = await Chat.findOne({
            participants: { $all: [currentUserId, userId] }
        });

        if (!chat) {
            return res.json([]);
        }

        // Get messages for this chat
        const messages = await Message.find({ chatId: chat._id })
            .populate('senderId', 'fullName profilePic')
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const { receiverId, content } = req.body;
        const senderId = req.user._id;

        // Find or create chat between users
        let chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!chat) {
            chat = await Chat.create({
                participants: [senderId, receiverId]
            });
        }

        // Create new message
        const message = await Message.create({
            chatId: chat._id,
            senderId,
            content
        });

        // Populate sender info
        await message.populate('senderId', 'fullName profilePic');

        // Update chat's last message
        chat.lastMessage = message._id;
        chat.updatedAt = new Date();
        await chat.save();

        // Emit to socket if available
        if (req.io) {
            req.io.to(receiverId.toString()).emit('newMessage', message);
        }

        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
};
