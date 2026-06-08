import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import lostItemRoutes from "./routes/lostItem.routes.js";
import foundItemRoutes from "./routes/FoundItem.routes.js";
import claimRoutes from "./routes/claim.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Reverto API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/lost", lostItemRoutes);
app.use("/api/found", foundItemRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});