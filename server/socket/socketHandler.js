// Main handler for all Socket.IO events.
import User from '../models/User.js';

const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 New connection: ${socket.id}`);

    socket.on('setup', async (userData) => {
      socket.join(userData._id);
      await User.findByIdAndUpdate(userData._id, { online: true });
      socket.emit('connected');
      console.log(`User ${userData.username} (${userData._id}) connected.`);
    });

    socket.on('join chat', (room) => {
      socket.join(room);
      console.log('User joined room: ' + room);
    });
    
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('disconnect', () => {
        console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });
};

export default initializeSocket;