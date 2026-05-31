require("dotenv").config();
const { Pool } = require("pg");

//Instantiate the connection pool using the enviroment variable

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Test the database connection upon initialization
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection error:", err.stack);
  } else {
    console.log("✅ Connected to the PostgreSQL database pool successfully.");
  }
});

module.exports = pool;
