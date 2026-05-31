const express = require("express");
const app = express();

//Import the database pool to trigger its connection check
const pool = require("./config/db");

//Middleware to parse incoming JSON requests
app.use(express.json());

//A simple health check route to verify the server is responding
app.get("/api/health", (req, res) => {
  res.json({ status: "UP", message: "Server is running smoothly" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
