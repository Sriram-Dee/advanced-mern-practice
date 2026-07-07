# Advanced MERN Stack Practice

Welcome to the **Advanced MERN Stack Practice** repository! This project is designed as a structured learning environment to master advanced MERN (MongoDB, Express, React, Node.js) Stack concepts.

To keep the repository clean and modular, the codebase is organized using a **branch-per-tier** architecture, allowing you to practice frontend and backend development in isolation. Both tiers connect to the same remote GitHub repository but reside in separate branches, allowing them to remain completely independent locally.

---

## 📂 Repository Structure & Branches

This repository is split into two primary branches representing the frontend and backend of the application:

### 1. 🖥️ `frontend` Branch
Contains advanced React & Redux state management patterns.
* **Key Features**:
  * **RTK-Query Application**: Demonstrates declarative data fetching, cache validation, query parameters, mutations, and state management using Redux Toolkit Query.
  * **asyncThunk Application**: Demonstrates handling asynchronous operations, side-effects, extraReducers, and custom lifecycle actions with `createAsyncThunk`.
* **To check out the frontend branch**:
  ```bash
  git checkout frontend
  ```

### 2. ⚙️ `backend` Branch
Contains the complete server-side architecture and database integration.
* **Key Features**:
  * **Express & Node.js Application**: Custom JWT-based authentication (Http-Only cookies, access/refresh tokens), user routing, role-based access validation, and post management.
  * **Mongoose & MongoDB Integration**: Database schemas, models (users, posts, counters), and database connection handling.
  * **Products mock API (JSON Server)**: Serves mock product catalog data on port `3000` via `npx json-server --watch db.json --port 3000`.
  * **Seed Script**: A database seeding script (`seedPosts.js`) to prepopulate MongoDB with user and post data.
* **To check out the backend branch**:
  ```bash
  git checkout backend
  ```

---

## 🚀 How to Get Started

### 1. Clone the Repository
```bash
git clone https://github.com/Sriram-Dee/advanced-mern-practice.git
cd advanced-mern-practice
```

### 2. Explore the Frontend
Switch to the `frontend` branch to view, install, and run the React applications:
```bash
git checkout frontend
cd RTK-Query # or cd asyncThunk
npm install
npm run dev
```

### 3. Explore the Backend
Switch to the `backend` branch to set up your `.env.local` configuration, seed the database, and start the servers:
```bash
git checkout backend
npm install
# Set up .env.local file from .env.example
npm run dev
```

---

## 🛠️ Technology Stack & Tools Used
* **Frontend**: React.js, Vite, Redux Toolkit (RTK-Query & Async Thunks)
* **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT (jsonwebtoken), bcrypt (for password hashing), Cookie-Parser
* **Mock Database**: JSON Server (for rapid mockup API testing on products)

Enjoy practicing advanced MERN stack concepts! 🚀
