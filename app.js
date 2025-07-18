const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// Add middleware to parse JSON
app.use(express.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3001', 'https://7dollars.shop'], // Allow both local and Shopify store
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }
});

var chatMap = new Map(); // { socket.id: { visitorId, messages: [], otherInfo: {} } }

// Simple GET API endpoints
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/chat-stats', (req, res) => {
  const activeChats = chatMap.size;
  const totalMessages = Array.from(chatMap.values()).reduce((total, chat) => {
    return total + (chat.messages ? chat.messages.length : 0);
  }, 0);
  
  res.json({
    activeChats,
    totalMessages,
    serverTime: new Date().toISOString()
  });
});

app.get('/api/visitors', (req, res) => {
  const visitors = Array.from(chatMap.keys());
  res.json({
    visitors,
    count: visitors.length
  });
});

// Handle visitor messages
// io.on('connection', (socket) => {
//   console.log('A user connected: ' + socket.id);


//   socket.on('visitorConnected', (visitorInfo) => {
//     console.log('Visitor connected:', visitorInfo);

//     const { visitorId } = visitorInfo;

//     if (chatMap.has(visitorId)) {
//       // Visitor already exists, update their socket ID
//       const existingChat = chatMap.get(visitorId);
//       existingChat.visitorSocketId = socket.id;

//       console.log(`Visitor ${visitorId} already exists. Updated socket ID: ${socket.id}`);
//       // Ensure the visitor joins their existing room
//       socket.join(existingChat.roomId);

//       // Send invite to admin
//       io.emit('CHAT_INVITATION', { chatId: existingChat.chatId, visitorId: existingChat.visitorId, roomId: existingChat.roomId });

//     } else {
//       // New visitor, generate a chatId and roomId
//       const chatId = crypto.randomUUID(); // Generate a unique chat ID
//       const roomId = `Room visitor:${visitorId} chat:${chatId}`;

//       // Create a new chat entry
//       chatMap.set(visitorId, {
//         chatId,
//         roomId,
//         messages: [],
//         visitorSocketId: socket.id,
//         visitorInfo,
//       });

//       // Add visitor to the room
//       socket.join(roomId);

//       console.log(`New visitor ${visitorId} joined room: ${roomId}`);

//       // Send invite to admin
//       io.emit('CHAT_INVITATION', { chatId, visitorId, roomId });
//     }
//   });


//   socket.on('ADMIN_JOIN_ROOM', (roomId) => {
//     console.log(`room id`, roomId);
//     socket.join(roomId);
//   })

//   socket.on('SEND_MESSAGE', ({ chatId, visitorId, message, sender }) => {
//     const chatData = chatMap.get(visitorId);

//     if (chatData) {
//       // Store the message in chat history
//       chatData.messages.push({ sender: sender, message });

//       console.log(`Message from ${sender} , visitor id (${visitorId}):`, message);

//       var _chatId = chatId
//       if (sender == 'visitor') {
//         _chatId = chatData.chatId
//       }
//       // Broadcast the message to the room
//       const obj = { chatId: _chatId, sender: sender, message }
//       console.log(`packet `, obj);

//       io.to(chatData.roomId).emit('RECEIVE_MESSAGE', obj);
//     } else {
//       socket.emit('error', 'Chat not found');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected: ' + socket.id);
//     // delete activeChats[socket.id];
//   });
// });

// Start the server
// server.listen(5000, () => {
//   console.log('Server listening on http://localhost:5000');
// });

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});