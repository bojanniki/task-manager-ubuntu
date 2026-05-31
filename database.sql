-- =========================================================================
-- TASK MANAGER DATABASE SCHEMA
-- Relational Model: One-to-Many (Users -> Tasks)
-- Target Platform: PostgreSQL
-- =========================================================================

-- 1. Drop tables if they already exist (Useful for rapid testing/resetting)
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

-- 2. Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Tasks Table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);