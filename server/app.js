const express = require("express");
const app = express();

//Import the database pool to trigger its connection check
const pool = require("./config/db");

//Import the auth routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks"); //1. Import the task routes

//Middleware to parse incoming JSON requests
app.use(express.json());

//Link the auth routes to the /api/auth prefix
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

//A simple health check route to verify the server is responding
app.get("/api/health", (req, res) => {
  res.json({ status: "UP", message: "Server is running smoothly" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
