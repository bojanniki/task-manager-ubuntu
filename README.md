# Task Manager App on Ubuntu Server

## 🎯 Project Overview
This project is a full-stack, production-modeled Task Manager application. The goal is to build and operate a secure, authenticated CRUD application while maintaining a professional deployment workflow within an isolated virtualized home lab.

## 🏗️ Architecture
The application follows a strict separation of concerns, deployed in a multi-subnet network architecture:
- **Frontend:** Vanilla HTML5, CSS3, and JavaScript.
- **Backend:** Node.js, Express, and PostgreSQL.
- **Environment:** Ubuntu Server (Production) and Windows (Development).
- **Security:** UFW-hardened firewalling and encrypted password handling.

## 🛠️ Tech Stack
- **Languages:** JavaScript (ES6+), SQL.
- **Frameworks:** Express.js.
- **Database:** PostgreSQL (Connection via `pg` Pool).
- **Tooling:** PM2 (Process Manager), Git, and VS Code Remote-SSH.

## 🌐 Lab Environment
- **Development:** Windows Host (VS Code).
- **Production:** Ubuntu Server (Dual-homed gateway).
- **Client:** Linux Mint (Internal network testing).

## 🚀 Deployment Workflow
1. **Develop:** Code and test locally on Windows.
2. **Commit:** Push code to this GitHub repository.
3. **Deploy:** Pull updates on the Ubuntu Server via Git and restart the application using PM2.
