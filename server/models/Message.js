// Defines the schema for a single message.
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  // ... (schema definition remains the same)
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    attachments: [{ fileUrl: String, fileType: String }],
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;