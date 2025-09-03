// Defines the schema for a chat conversation.
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  // ... (schema definition remains the same)
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;