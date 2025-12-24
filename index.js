// Simple Socket.IO server for Christmas Tree real-time sync
// Deploy this to Glitch.com, Render.com, or Railway.app (all have free tiers)

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Store decorations for each room
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-room', (roomCode) => {
        socket.join(roomCode);
        console.log(`Client ${socket.id} joined room: ${roomCode}`);

        // Initialize room if it doesn't exist
        if (!rooms.has(roomCode)) {
            rooms.set(roomCode, []);
        }

        socket.emit('room-joined');
    });

    socket.on('request-sync', (roomCode) => {
        const decorations = rooms.get(roomCode) || [];
        socket.emit('sync-decorations', decorations);
    });

    socket.on('add-decoration', ({ roomCode, decoration }) => {
        // Add decoration to room
        if (!rooms.has(roomCode)) {
            rooms.set(roomCode, []);
        }
        rooms.get(roomCode).push(decoration);

        // Broadcast to all clients in the room except sender
        socket.to(roomCode).emit('decoration-added', decoration);
    });

    socket.on('leave-room', (roomCode) => {
        socket.leave(roomCode);
        console.log(`Client ${socket.id} left room: ${roomCode}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`🎄 Christmas Tree Sync Server running on port ${PORT}`);
});
