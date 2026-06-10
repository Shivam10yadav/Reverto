import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../models/message.model.js";
import Claim from "../models/claim.model.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
  process.env.CLIENT_URL,
  "http://localhost:5173",
],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

io.use((socket, next) => {
  try {
    const cookies = socket.handshake.headers.cookie;

    const token = cookies
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("No token"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    socket.userId = decoded.id;

   

    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

  // ── Connection 
  io.on("connection", (socket) => {

    socket.on("join_room", async ({ claimId }) => {
      try {
        const claim = await Claim.findById(claimId);
        if (!claim) return socket.emit("error", { message: "Claim not found." });

        const isOwner = claim.ownerId.toString() === socket.userId.toString();
        const isClaimant = claim.claimantId.toString() === socket.userId.toString();
        if (!isOwner && !isClaimant) {
          return socket.emit("error", { message: "Not authorized." });
        }

        if (claim.status !== "approved") {
          return socket.emit("error", { message: "Chat only available for approved claims." });
        }

        socket.join(claimId);
        socket.emit("joined_room", { claimId });
      } catch (err) {
        socket.emit("error", { message: err.message });
      }
    });

    // Send a message
    socket.on("send_message", async ({ claimId, text }) => {
      try {
        if (!text?.trim()) return;

        const claim = await Claim.findById(claimId);
        if (!claim || claim.status !== "approved") return;

        const isOwner = claim.ownerId.toString() === socket.userId.toString();
        const isClaimant = claim.claimantId.toString() === socket.userId.toString();
        if (!isOwner && !isClaimant) return;

        const receiverId = isOwner ? claim.claimantId : claim.ownerId;

        // Save to DB
        const message = await Message.create({
          claimId,
          senderId: socket.userId,
          receiverId,
          text: text.trim(),
        });

        const populated = await message.populate("senderId", "name");

        io.to(claimId).emit("new_message", populated);
      } catch (err) {
        socket.emit("error", { message: err.message });
      }
    });

    socket.on("mark_read", async ({ claimId }) => {
      try {
        await Message.updateMany(
          { claimId, receiverId: socket.userId, read: false },
          { read: true }
        );
        io.to(claimId).emit("messages_read", { by: socket.userId, claimId });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized.");
  return io;
};