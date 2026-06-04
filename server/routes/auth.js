const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../config/db"); //Import the active database pool

// @route   POST /api/auth/register
// @desc    Register a new user with an encrypted password
// @access  Public

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //1. Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please, provide both username and password" });
  }
  try {
    //2. Check if the user already exists in the database
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    //3. Hash the password securely using bcrypt
    // The saltRounds (10) determines how computationally expensive the hash is
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    //4. Insert the new user into the database
    //The id and the username are returned, but not the password hash
    const newUser = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at",
      [username, passwordHash],
    );
    //5. Respond with success and the safe user data
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    return res.status(500).json({ error: "Server error during registration" });
  }
});
// @route   POST /api/auth/login
// @desc    Authenticate user and verify credentials
// @access  Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //1. Basic validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: " Please provide both username and password" });
  }
  try {
    //2. Locate the user in the database
    const userResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    if (userResult.rows.length === 0) {
      //Generic error message so that it's not known if the user exists
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const user = userResult.rows[0];

    //3. Compare incoming plain text password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    //4. Success - issue a JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24 h" },
    );
    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        username: user.name,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    return res
      .status(500)
      .json({ error: "Server error during authentication." });
  }
});
module.exports = router;
