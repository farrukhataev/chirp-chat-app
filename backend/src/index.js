import express from "express";
import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {
  app,
  server,
  getOnlineUsers,
  getReceiverSocketId,
  io,
} from "./lib/socket.js";

const PORT = process.env.PORT;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const __dirname = path.resolve();

// allow larger payloads for image uploads (base64 data URIs)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5174"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// debug: list online users
app.get("/api/debug/online-users", (req, res) => {
  try {
    res.json({ online: getOnlineUsers() });
  } catch (err) {
    res.status(500).json({ error: "failed to get online users" });
  }
});

// debug: emit a test message to a receiverId (no auth, temporary)
app.post("/api/debug/emit/:receiverId", (req, res) => {
  const { receiverId } = req.params;
  try {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (!receiverSocketId)
      return res.status(404).json({ error: "receiver not connected" });

    const fakeMessage = {
      _id: "debug-" + Date.now(),
      senderId: "debug-server",
      receiverId,
      text: "Debug message " + new Date().toISOString(),
      createdAt: new Date(),
    };

    io.to(receiverSocketId).emit("newMessage", fakeMessage);

    return res.json({ ok: true, message: fakeMessage });
  } catch (err) {
    console.error("debug emit error:", err);
    return res.status(500).json({ error: "emit failed" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
