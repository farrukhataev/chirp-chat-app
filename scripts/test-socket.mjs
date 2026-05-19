import path from "path";
import { fileURLToPath } from "url";

// dynamically import socket.io-client from frontend node_modules
const frontendNodeModules = path.resolve(
  process.cwd(),
  "frontend",
  "node_modules",
);
const socketClientPath = "socket.io-client/dist/socket.io.js";
let io;
try {
  const mod = await import(path.join(frontendNodeModules, socketClientPath));
  // the CDN build exposes global, but here try dynamic import of ESM package
  io = (await import("socket.io-client")).io;
} catch (err) {
  // fallback to importing normal package resolution
  io = (await import("socket.io-client")).io;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const URL = process.env.URL || "http://localhost:5001";

  const a = io(URL, { query: { userId: "client-A" }, autoConnect: false });
  const b = io(URL, { query: { userId: "client-B" }, autoConnect: false });

  a.on("connect", () => console.log("A connected", a.id));
  b.on("connect", () => console.log("B connected", b.id));

  a.on("newMessage", (msg) => console.log("A got newMessage", msg && msg.text));
  b.on("newMessage", (msg) => console.log("B got newMessage", msg && msg.text));

  await Promise.all([
    new Promise((r) => {
      a.connect();
      a.once("connect", r);
    }),
    new Promise((r) => {
      b.connect();
      b.once("connect", r);
    }),
  ]);

  console.log("Both connected");

  // simulate server-emitted newMessage to B via server by making API call
  // Instead, emit from A to server if server listens; many servers expect HTTP POST to /messages/send/:id

  // try to emit client->server if server handles it
  a.emit("sendMessage", { receiverId: "client-B", text: "Hello from A" });

  // wait to receive
  await sleep(1500);

  a.disconnect();
  b.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
