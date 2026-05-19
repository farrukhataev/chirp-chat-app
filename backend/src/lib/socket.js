import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// store online users
const userSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export function getOnlineUsers() {
  return Object.keys(userSocketMap);
}

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Socket.io CORS configuration - allow localhost on any port in development
const socketCorsOrigins = [FRONTEND_URL];
if (process.env.NODE_ENV !== "production") {
  socketCorsOrigins.push(/^http:\/\/localhost:\d{4,5}$/);
}

const io = new Server(server, {
  cors: {
    origin: socketCorsOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  // only register valid non-empty string userIds (protect against 'undefined' or empty values)
  if (
    typeof userId === "string" &&
    userId.trim() !== "" &&
    userId !== "undefined"
  ) {
    userSocketMap[userId] = socket.id;
    socket.data = socket.data || {};
    socket.data.userId = userId;
    console.log("User registered:", userId, "Online users now:", Object.keys(userSocketMap));
  }

  // Send current online users list to the connected client
  socket.emit("getOnlineUsers", Object.keys(userSocketMap));
  
  // Broadcast to all clients that someone came online
  socket.broadcast.emit("getOnlineUsers", Object.keys(userSocketMap));

  // User status change event
  socket.on("userStatusChange", (data) => {
    const { status } = data;
    socket.broadcast.emit("userStatusChanged", {
      userId: socket.data.userId,
      status: status,
      isOnline: true,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    // remove mapping for this socket's userId if set, otherwise fallback to search by socket id
    if (socket.data && socket.data.userId) {
      delete userSocketMap[socket.data.userId];
      // Notify other users that someone went offline
      io.emit("userOffline", socket.data.userId);
    } else {
      const entry = Object.keys(userSocketMap).find(
        (k) => userSocketMap[k] === socket.id,
      );
      if (entry) {
        delete userSocketMap[entry];
        io.emit("userOffline", entry);
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
