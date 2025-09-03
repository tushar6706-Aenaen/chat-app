import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Replicate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage engine for profile pictures
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/profiles'));
  },
  filename: (req, file, cb) => {
    // Create a unique filename to prevent overwrites
    cb(null, `profile-${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Set up storage engine for message attachments
const messageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads/messages'));
    },
    filename: (req, file, cb) => {
      cb(null, `message-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

// File filter to accept only images
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

export const uploadProfilePic = multer({
  storage: profileStorage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: imageFileFilter,
}).single('profilePicture'); // 'profilePicture' is the field name in the form

export const uploadMessageAttachment = multer({
    storage: messageStorage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
}).single('attachment'); // 'attachment' is the field name in the form