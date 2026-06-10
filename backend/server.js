import express from "express";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initSocket } from "./socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import lostItemRoutes from "./routes/lostItem.routes.js";
import foundItemRoutes from "./routes/foundItem.routes.js";
import claimRoutes from "./routes/claim.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const app = express();

// Create http server from express app
// We need this so socket.io can attach to the same server
const server = http.createServer(app);

// Attach socket.io
initSocket(server);

// Middleware
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Reverto API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/lost", lostItemRoutes);
app.use("/api/found", foundItemRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/messages", messageRoutes);

// Start
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});