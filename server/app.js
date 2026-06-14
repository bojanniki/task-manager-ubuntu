const express = require("express");
const app = express();

//import path module
const path = require("path");

//Import the database pool to trigger its connection check
const pool = require("./config/db");

//Import the auth routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks"); 

//Import the error handler
const errorHandler = require("./middleware/errorHandler");

//Middleware to parse incoming JSON requests
app.use(express.json());

//serve static files from the public folder
app.use(express.static(path.join(__dirname, "..", "public")));

//Link the auth routes to the /api/auth prefix
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

//A simple health check route to verify the server is responding
app.get("/api/health", (req, res) => {
  res.json({ status: "UP", message: "Server is running smoothly" });
});

//fallback route to server index.html fro any non-API requests

// Use a native JavaScript RegExp literal to bypass path-to-regexp string validation entirely
app.get(/^(?!\/api).*$/, (req, res) => {
  if (req.url.includes(".")) {
    return res.status(404).end();
  }
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
