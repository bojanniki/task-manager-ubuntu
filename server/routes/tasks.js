const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

//apply the gatekeeper middleware to ALL task routes in this file
router.use(authMiddleware);

//1.Create a new task
//@route POST api/tasks
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }
  try {
    const newTask = await pool.query(
      "INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [req.user.userId, title, description],
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error("❌ Create Task Error:", err.message);
    res.status(500).json({ error: "Server error while creating task" });
  }
});

//2.Read all tasks for the logged-in user
//@route GET /api/tasks
router.get("/", async (req, res) => {
  try {
    const userTasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.userId],
    );
    res.json(userTasks.rows);
  } catch (err) {
    console.error("❌ Get Tasks Error:", err.message);
    res.status(500).json({ error: "Server error while fetching tasks" });
  }
});

//3. Update a task status/details
//@route PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;

  try {
    //Include user_id = $2 to prevent users from updating someone else's tasks via ID manipulation
    const updatedTask = await pool.query(
      "UPDATE tasks SET title = COALESCE ($1, title), description = COALESCE ($2, description), is_completed = COALESCE($3, is_completed), updated_at = NOW() WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, description, is_completed, id, req.user.userId],
    );
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error("❌ Update Task Error:", err.message);
    res.status(500).json({ error: "Server error while updating task" });
  }
});

//4.Delete a task
//@route DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await pool.query(
      "DELETE FROM tasks where id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.userId],
    );
    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Task Error:", err.message);
    res.status(500).json({ error: "Server error while deleting task." });
  }
});
module.exports = router;
