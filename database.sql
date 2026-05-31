-- Setup Instructions:
-- 1. Create your database: CREATE DATABASE project_name
-- 2. Connect to it
-- 3. Define your tables below

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)

--Insert a test seed
INSERT INTO items (content) VALUES ('Scaffold connection successful!');