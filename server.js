const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database Connection
require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Home Route
app.get("/", (req, res) => {
  res.send("Backend is running with PostgreSQL...");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Handle Invalid Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Server Port
const PORT = process.env.PORT || 5050;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});