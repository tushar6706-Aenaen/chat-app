
// Main server entry point
import dotenv from 'dotenv';
dotenv.config();
import express, { json, urlencoded, static as expressStatic } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { join, dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import initializeSocket from './socket/socketHandler.js';

// Import Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import chatRoutes from './routes/chats.js';
import messageRoutes from './routes/messages.js';

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to Database
connectDB();

const app = express();
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Pass the io instance to the socket handler
initializeSocket(io);

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));

// Make io accessible to our router
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the "uploads" directory
app.use('/uploads', expressStatic(join(__dirname, 'uploads')));

// API Routes
app.get('/', (req, res) => {
    res.send('ChitChat API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});