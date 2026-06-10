# Task Manager App — Project Progress Log

**Purpose:** Learn full-stack web development while building a production-style application from scratch.
**Stack:** HTML · CSS · JavaScript · Node.js · Express · PostgreSQL
**Dev Environment:** Windows + WSL2 (Ubuntu) + VS Code
**Deployment Target:** Ubuntu Server
**Version Control:** Git & GitHub

---

## 📊 Milestone Overview

| #   | Milestone                                   | Status         |
| --- | ------------------------------------------- | -------------- |
| 1   | Project Foundation                          | ✅ Complete    |
| 2   | Backend Infrastructure, Security & REST API | ✅ Complete    |
| 3   | Frontend UI Development                     | 🔄 In Progress |
| 4   | Server Hardening & Observability            | 🔲 Pending     |
| 5   | Ubuntu Server Deployment                    | 🔲 Pending     |

---

## ✅ Milestone 1 — Project Foundation

**Status:** Complete

### Objectives Achieved

- [x] Initialized Git repository and established GitHub push workflow
- [x] Created project directory structure
- [x] Configured `.gitignore` and `.env.example`
- [x] Set up local PostgreSQL database (`task_manager_db`)
- [x] Designed and executed relational database schema

### Database Schema

**`users`**
| Column | Type | Constraint |
|--------|------|------------|
| `id` | SERIAL | Primary Key |
| `username` | VARCHAR(50) | Unique, Not Null |
| `password_hash` | VARCHAR(255) | Not Null |
| `created_at` | TIMESTAMP | Default Now |

**`tasks`**
| Column | Type | Constraint |
|--------|------|------------|
| `id` | SERIAL | Primary Key |
| `user_id` | INTEGER | FK → users(id) ON DELETE CASCADE |
| `title` | VARCHAR(100) | Not Null |
| `description` | TEXT | — |
| `is_completed` | BOOLEAN | Default FALSE |
| `created_at` | TIMESTAMP | Default Now |

### Lessons Learned

- Git basics and repository management
- Importance of environment variables and secrets management
- Relational database design fundamentals
- PostgreSQL table creation and foreign key relationships

---

## ✅ Milestone 2 — Backend Infrastructure, Security & REST API

**Status:** Complete

### Log Entry: May 31, 2026 — Express & Connection Pooling

- **Express Backend:** Configured `server/app.js`, initialized the Express application on port `5000`.
- **PostgreSQL Pool:** Structured `server/config/db.js` using `pg.Pool` for concurrent connection handling.
- **WSL2 Networking Fix:** Resolved `ECONNREFUSED` by identifying the WSL2 gateway IP and updating `pg_hba.conf` to permit cross-environment connections from the Windows host.

---

### Log Entry: June 2, 2026 — Cryptographic Registration

- **Dependencies:** Installed and natively compiled `bcrypt` binaries inside the Linux runtime.
- **Register Endpoint:** Built `POST /api/auth/register` inside `server/routes/auth.js`.
- **SQL Injection Prevention:** Enforced parameterized query inputs (`$1`, `$2`) on all database writes.
- **Input Hardening:** Account existence checks, input sanitization, and automated salt-hashing before any record reaches the database.

---

### Log Entry: June 2, 2026 — Network Hardening & Timeouts

- **Silent Hang Fix:** Re-engineered the pool config with an explicit `connectionTimeoutMillis: 5000` threshold to break silent network drops.
- **Windows Firewall Rule:** Diagnosed packet-dropping at the Windows Advanced Security Firewall layer. Created a custom Inbound Rule for TCP Port 5432, enabling stable WSL-to-Host traffic.

---

### Log Entry: June 2, 2026 — Login & Enumeration Defense

- **Login Endpoint:** Engineered `POST /api/auth/login` with full authentication pipeline.
- **Hash Verification:** Used `bcrypt.compare` to validate plaintext submissions against stored hashes without exposing raw values.
- **Enumeration Defense:** Generic `401 Unauthorized` responses for both missing usernames and incorrect passwords — no detail leaked to prevent user harvesting.

---

### Log Entry: June 4, 2026 — JWT Middleware & Task CRUD

- **Stateless Sessions:** Integrated `jsonwebtoken` to sign and decode sealed tokens containing user claims — no server-side session memory required.
- **Auth Middleware:** Deployed `authMiddleware.js` to intercept and validate `Authorization: Bearer <token>` headers on all protected routes.
- **Task CRUD Suite:** Completed full REST task endpoints (`POST`, `GET`, `PUT`, `DELETE`) in `server/routes/tasks.js`, with every query scoped to `req.user.userId` for multi-tenant isolation.

### Lessons Learned

- WSL2-to-Windows firewall loopback traversal and network debugging
- bcrypt key-stretching, salt composition, and computational hardening
- JWT structure (Header · Payload · Signature) and tamper detection
- Multi-tenant query isolation in relational databases

---

## 🔄 Milestone 3 — Frontend UI Development

**Status:** In Progress

### Log Entry: June 6, 2026 — Frontend UI Implementation & Infrastructure

- **UI Mockup Implementation:** Developed complete static frontend mockups for the Authentication flow (Login/Register), establishing the visual foundation for the application.
- **Routing Engine Overhaul:** Migrated from deprecated `*` string wildcards to native JavaScript Regex (`/^(?!\/api).*$/`) for SPA routing to comply with `path-to-regexp` v8 strictness.
- **Static Asset Path Alignment:** Synchronized `express.static` middleware root configuration with client-side HTML `<script>` and `<link>` requests, resolving 404 resource errors.
- **Frontend State Management:** Debugged UI toggling logic by correcting CSS syntax errors (`border-radius`), removing conflicting `hidden` HTML attributes, and refining class-toggling scripts to enforce a single source of truth for component visibility.

---

### Log Entry: June 10, 2026 — Auth Flow & Security Validation

- **Form Integration:** Successfully connected the Registration and Login forms to backend API endpoints using the `fetch` API.
- **Client-Side Authentication:** Implemented `async/await` request handlers to process server responses and manage UI state transitions.
- **Security Validation:** Conducted `curl` guard tests confirming `authMiddleware` correctly blocks unauthenticated requests with `401 Unauthorized`.
- **JWT Handling:** Established the client-side authentication lifecycle — confirmed receipt and valid payload delivery of JSON Web Tokens.

### Lessons Learned

- `async` keyword is required when using `await` in `fetch` operations — omitting it causes a syntax error
- `fetch` does not treat non-2xx responses as errors; `response.ok` must be checked explicitly
- CLI tools like `curl` are essential for manually verifying middleware security boundaries

### Remaining Tasks

- [x] Wire Login/Register forms to `POST /api/auth/login` and `POST /api/auth/register`
- [ ] Store JWT token in `localStorage` and attach to authenticated requests
- [ ] Build dynamic Task dashboard fed from CRUD REST endpoints
- [ ] Client-side form validation and user-facing error/status feedback
- [ ] Handle logout (clear token, redirect to auth screen)

---

## 🔲 Milestone 4 — Server Hardening & Observability

**Status:** Pending

### Planned Tasks

- [ ] Configure global error-handling middleware in Express
- [ ] Set up environment-aware structured logging (Winston or Morgan)
- [ ] Evaluate refresh token architecture for robust session management

---

## 🔲 Milestone 5 — Ubuntu Server Deployment

**Status:** Pending

### Planned Tasks

- [ ] Provision clean production Ubuntu Server instance
- [ ] Install runtime prerequisites (Node.js, PostgreSQL)
- [ ] Configure Nginx as reverse proxy + PM2 as process manager
- [ ] Execute live production pipeline migration and smoke tests
- [ ] Verify Git deployment pipeline: `git push` (Windows) → `git pull` (Ubuntu)

---

## 📁 Project Structure

```
task-manager-ubuntu/
├── node_modules/
├── public/
│   ├── css/
│   │   └── style.css            ✅
│   └── js/
│       ├── auth.js              ✅
│       └── index.html           ✅
├── server/
│   ├── config/
│   │   └── db.js                ✅
│   ├── middleware/
│   │   └── authMiddleware.js    ✅
│   ├── routes/
│   │   ├── auth.js              ✅
│   │   └── tasks.js             ✅
│   └── app.js                   ✅
├── .env                         (untracked)
├── .env.example
├── .gitignore
├── database.sql
├── package-lock.json
├── package.json
├── PROGRESS.md
└── README.md
```

---

_Last updated: June 10, 2026 — Auth flow complete and verified. Next: Task dashboard HTML._
