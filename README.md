# Task Manager Web Application

A full-stack task management application developed as part of a production-like lab environment. The project covers the complete software lifecycle: database design, REST API development, network security, and deployment on an Ubuntu server.

---

## 🎯 Project Overview

This project is a full-stack, production-modeled Task Manager application. The goal is to build a secure, authenticated CRUD system and deploy it within an isolated virtualized lab environment.

---

## 🏗️ Architecture

The application follows a three-tier architecture with clearly separated components:

- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (pg Pool connection)  
- **Reverse Proxy:** Nginx  
- **Environment:** Ubuntu Server (production), Windows (development)  
- **Security:** UFW firewall, JWT authentication, bcrypt password hashing  

---

## 🛠️ Tech Stack

- **Languages:** JavaScript (ES6+), SQL  
- **Frameworks:** Express.js  
- **Database:** PostgreSQL  
- **Process Manager:** PM2  
- **Version Control:** Git, GitHub  
- **Development Tools:** VS Code Remote-SSH  

---

## 🌐 Lab Environment

- **Development:** Windows host (VS Code / optional WSL)  
- **Production:** Ubuntu Server (dual-homed gateway setup)  
- **Client Testing:** Linux Mint (internal network testing)  

---

## 🚀 Deployment Workflow

1. **Develop:** Local development and testing on a Windows environment  
2. **Commit:** Push changes to GitHub repository  
3. **Deploy:** Pull updates on the Ubuntu server and restart the application:

```bash
git pull origin main
pm2 restart task-manager
```

---

## 🔐 Security Features

- **Authentication:** JWT (stateless sessions)  
- **Password Security:** bcrypt hashing  
- **SQL Protection:** Parameterized queries to prevent SQL injection  
- **Network Security:** UFW firewall rules restricting access to required services only  

---

## 🔌 API Endpoints

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| POST   | /api/auth/register  | User registration           |
| POST   | /api/auth/login     | User login + JWT issuance   |
| GET    | /api/tasks          | Retrieve all user tasks     |
| POST   | /api/tasks          | Create a new task           |
| PUT    | /api/tasks/:id      | Update / complete a task    |
| DELETE | /api/tasks/:id     | Delete a task               |

---

## ⚙️ Project Setup

1. **Clone repository**
```bash
git clone https://github.com/bojanniki/task-manager-ubuntu.git
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file:
```
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

4. **Database setup**
Import `database.sql` into PostgreSQL.

5. **Run the application**

Development:
```bash
npm start
```

Production:
```bash
pm2 start server/app.js
```

---

## 📌 Notes

This project was built for learning full-stack development, DevOps workflow practices, and basic cybersecurity principles in a realistic server environment.
```