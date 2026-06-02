require("dotenv").config();
const { Pool } = require("pg");

//Instantiate the connection pool using the enviroment variable

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000, //Give up after 5 seconds instead of hanging forever
});

// Immediately invoked function expression (IIFE) to test the connection cleanly
(async () => {
  try {
    //acquire a client from the pool to test the link
    const client = await pool.connect();
    const res = await client.query("SELECT NOW()");
    console.log("✅ Connected to the PostgreSQL database pool successfully.");
    console.log(`🕒 Database Time: ${res.rows[0].now}`);
    client.release();
  } catch (err) {
    console.error("❌ Database connection error details:");
    console.error(err.message);
  }
})();

module.exports = pool;
