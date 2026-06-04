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

# Milestone 2 — Backend Infrastructure, Security & REST API ✅

**Status:** Complete

## Log Entries & Technical Implementations

### Log Entry: May 31, 2026 — Express & Connection Pooling

- **Express Backend Initialization:** Configured `server/app.js`, initialized the Express application, and verified the server runtime listening on port `5000`.
- **PostgreSQL Connection Pool:** Structured `server/config/db.js` using `pg.Pool` to efficiently handle relational database transactions.
- **WSL2 Networking Resolution:** Isolated a cross-environment `ECONNREFUSED` connection failure. Resolved by determining the virtual network host gateway IP and configuring PostgreSQL's `pg_hba.conf` rule parameters to permit external loopback subnets.

### Log Entry: June 2, 2026 — Cryptographic Registrations

- **Dependency Integration:** Installed and natively compiled `bcrypt` binaries inside the Linux runtime.
- **Registration Routing:** Fabricated an asynchronous `POST /api/auth/register` endpoint inside `server/routes/auth.js`.
- **SQL Injection Prevention:** Implemented strict parameterized query inputs (`$1, $2`) protecting database writes.
- **Structural Validations:** Configured account existence verification, input sanitization, and automated salt-hashing routines before records hit the database.

### Log Entry: June 2, 2026 — Network Hardening & Timeouts

- **Silent Hang Diagnosis:** Re-engineered the database pool analyzer with an IIFE wrapping an explicit 5000ms `connectionTimeoutMillis` threshold, breaking silent network drops.
- **Firewall Gate Routing:** Isolated a packet-dropping issue originating from the Windows Advanced Security Firewall layer. Rectified by constructing a custom Inbound Rule exception for TCP Port 5432, enabling smooth WSL-to-Host communication.

### Log Entry: June 2, 2026 — Cryptographic Challenge Login

- **Authentication Pipeline:** Engineered a robust `POST /api/auth/login` endpoint.
- **Safe Hash Verification:** Utilized decoupled `bcrypt.compare` procedures to mathematically authenticate plain text submissions against stored hashes without raw value leaks.
- **Enumeration Defense:** Formulated generic, non-descriptive error paths (`401 Unauthorized`) for both missing usernames and incorrect secrets to neutralize profile harvesting.

### Log Entry: June 4, 2026 — JWT State Enforcement & Task CRUD

- **Stateless Session Engine:** Integrated the `jsonwebtoken` package to sign, deliver, and decode cryptographically sealed tokens containing user claims, avoiding local server memory allocation.
- **Interception Middleware:** Deployed a reusable `authMiddleware.js` layer checking the incoming HTTP `Authorization: Bearer <token>` layout to block unauthorized requests.
- **Multi-Tenant Isolation Scoping:** Completed a full REST task suite (`POST`, `GET`, `PUT`, `DELETE`) inside `server/routes/tasks.js`, forcing every query constraint to evaluate against `req.user.userId`.

## Lessons Learned

- WSL2-to-Windows firewall loopback traversal architecture.
- Computational advantages and composition mechanics of bcrypt key-stretching salts.
- Composition of JSON Web Tokens (Header, Payload, Signature) and tamper detection properties.
- Database tenant isolation techniques in relational database models.

---

# Future Milestones

## Milestone 3 — Frontend UI Development

- Design static mockups for Auth and Dashboard components.
- Establish clean, vanilla DOM-manipulation structures.
- Coordinate client-side session management (storing and processing JWT tokens via `localStorage` or session wrappers).
- Create dynamic Task dashboard feeding directly from the CRUD REST endpoints.
- Build form entry and UI-side status validations.

## Milestone 4 — Server Hardening & Observability

- Configure global error handling middleware inside Express.
- Setup environment-aware structured loggers (such as Winston or Morgan).
- Evaluate refresh token configurations for robust session management.

## Milestone 5 — Ubuntu Server Deployment

- Provision a clean production Ubuntu Server instance.
- Deploy runtime prerequisites (Node.js, PostgreSQL environment configs).
- Setup Reverse Proxy structures (Nginx) alongside Process Managers (PM2) to ensure high-availability server up-time.
- Execute live production pipeline migration and testing checks.

---

# Notes

This document tracks major milestones, technical challenges, architectural decisions, and lessons learned throughout the development of the Task Manager App.
