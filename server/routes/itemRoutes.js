const express = require("express");
const router = express.Router();
const pool = require("../config/db");

//GET all items (Read)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM items ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST a new item (Create)
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    const newItem = await pool.query(
      "INSERT INTO items (content) VALUES ($1) RETURNING *",
      [content],
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
