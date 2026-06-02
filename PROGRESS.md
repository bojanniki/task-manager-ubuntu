# Project Progress Log

## Project Information

**Project:** Task Manager App
**Purpose:** Learn full-stack web development while building a production-style application from scratch.
**Stack:** HTML, CSS, JavaScript, Node.js, Express, PostgreSQL
**Development Environment:** Windows + WSL2 (Ubuntu) + VS Code
**Deployment Target:** Ubuntu Server
**Version Control:** Git & GitHub

---

# Milestone 1 — Project Foundation ✅

**Status:** Complete

## Objectives Achieved

- Initialized Git repository
- Created project structure
- Configured `.gitignore`
- Set up local PostgreSQL database (`task_manager_db`)
- Created relational database schema
- Established GitHub repository and push workflow

## Database Schema

### Users Table

- `id` (Primary Key)
- `username` (Unique)
- `password_hash`
- `created_at`

### Tasks Table

- `id` (Primary Key)
- `user_id` (Foreign Key)
- `title`
- `description`
- `is_completed`
- `created_at`

## Lessons Learned

- Git basics and repository management
- Importance of environment variables
- Relational database design fundamentals
- PostgreSQL table creation and relationships

---

# Milestone 2.1 — Backend Infrastructure & Database Connection ✅

**Date:** May 31, 2026

**Status:** Complete

## Objectives Achieved

### Express Backend Initialization

- Configured `server/app.js`
- Initialized Express application
- Configured server to run on port `5000`

### PostgreSQL Connection Pool

- Created `server/config/db.js`
- Implemented database connection pooling using `pg.Pool`
- Verified successful database connectivity

### WSL2 Networking Resolution

#### Problem

The Express application running inside WSL2 could not connect to PostgreSQL running on the Windows host machine.

Error:

```text
ECONNREFUSED
```

#### Investigation

- Identified WSL2 network isolation behavior
- Determined the Windows host gateway IP address
- Verified PostgreSQL listening configuration

#### Solution

- Updated PostgreSQL connection settings
- Configured `pg_hba.conf` to allow authenticated connections from the WSL virtual network
- Verified successful communication between WSL2 and PostgreSQL

## Lessons Learned

- WSL2 networking architecture
- PostgreSQL host-based authentication
- Connection pooling concepts
- Cross-environment debugging techniques

---

# Milestone 2.2 — REST API Foundation 🚧

### Log Entry: June 2, 2026

**Milestone:** 2.2 — Password Encryption & Registration API
**Status:** SUCCESS ✅

#### Technical Implementations:

- Installed `bcrypt` native binaries within the WSL Ubuntu runtime environment.
- Architected `server/routes/auth.js` to expose a secure asynchronous `POST /api/auth/register` endpoint.
- Implemented parameterized SQL queries (`$1, $2`) to eliminate SQL Injection vulnerability surfaces.
- Configured structural validations, uniqueness constraints, and salt-hashed password extraction before committing data mutations to the `users` table.

### Log Entry: June 2, 2026

**Milestone:** 2.3 — Firewall Gateway Resolution & Database Handshake
**Status:** SUCCESS ✅

#### Technical Implementations:

- Diagnosed a terminal connection silent-hang by rewriting the connection manager to use asynchronous `async/await` IIFE executions alongside an explicit 5000ms timeout threshold (`connectionTimeoutMillis`).
- Isolated the network bottleneck to the Windows Advanced Security Firewall layer dropping inbound packets from the virtual subnet loopback adapter.
- Constructed a custom Inbound Port Exception Rule for TCP Port 5432, safely routing remote traffic from the WSL Ubuntu container to the Windows host PostgreSQL instance.
- Verified live end-to-end telemetry by reading remote internal database timestamps natively within the Linux console.

### Log Entry: June 2, 2026

**Milestone:** 2.4 — Verification Architecture & Cryptographic Login API
**Status:** SUCCESS ✅

#### Technical Implementations:

- Engineered the `POST /api/auth/login` verification pipeline inside `server/routes/auth.js`.
- Implemented decoupled asynchronous credential verification using `bcrypt.compare` to calculate and match cryptographic signatures without exposing raw password strings.
- Implemented unified, non-descriptive error signaling (`401 Unauthorized`) for both absent accounts and invalid passwords to defend against user enumeration mapping attacks.
- Successfully executed end-to-end HTTP integration tests via `curl` to verify accurate credential routing and boundary rejection logic.

## Planned Objectives

- Create API route structure
- Implement test endpoints
- Establish controller pattern
- Create user routes
- Create task routes
- Add API error handling

---

# Future Milestones

## Milestone 3 — Authentication

- User registration
- Password hashing with bcrypt
- Login endpoint
- JWT authentication
- Protected routes

## Milestone 4 — Task Management

- Create tasks
- Read tasks
- Update tasks
- Delete tasks
- Task completion tracking

## Milestone 5 — Frontend Integration

- Connect frontend to backend API
- Authentication UI
- Task dashboard
- Form validation

## Milestone 6 — Deployment

- Ubuntu Server setup
- Environment configuration
- Production database configuration
- Git-based deployment workflow
- Final testing

---

# Notes

This document tracks major milestones, technical challenges, architectural decisions, and lessons learned throughout the development of the Task Manager App.
