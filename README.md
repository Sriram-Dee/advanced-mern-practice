# Advanced MERN Stack Practice

Welcome to the **Advanced MERN Stack Practice** repository! This project is designed as a structured learning environment to master advanced MERN (MongoDB, Express, React, Node.js) Stack concepts.

To keep the repository clean and modular, the codebase is organized using a **branch-per-tier** architecture, allowing you to practice frontend and backend development in isolation while maintaining clear separation of concerns.

---

## 📂 Repository Structure & Branches

This repository is split into two primary branches representing the frontend and backend of the application:

### 1. 🖥️ `frontend` Branch
Contains advanced React & Redux state management patterns.
* **Key Features**:
  * **RTK-Query Application**: Demonstrates declarative data fetching, caching, synchronization, and state management using Redux Toolkit Query.
  * **asyncThunk Application**: Demonstrates handling asynchronous operations, side-effects, and custom lifecycle actions with `createAsyncThunk`.
* **To check out the frontend**:
  ```bash
  git checkout frontend
  ```

### 2. ⚙️ `backend` Branch
Prepared for the server-side architecture and databases.
* **Key Features**:
  * **Products mock API (JSON Server)**: Serves mock data on port `3000` via `npx json-server --watch db.json --port 3000`.
  * **Express/Node.js Server**: Ready to integrate full backend capabilities (including authentication, routing, and MongoDB connectivity).
* **To check out the backend**:
  ```bash
  git checkout backend
  ```

---

## 🚀 How to Get Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sriram-Dee/advanced-mern-practice.git
   cd advanced-mern-practice
   ```

2. **Explore the Frontend**:
   Switch to the `frontend` branch to view, install, and run the React applications:
   ```bash
   git checkout frontend
   ```

3. **Explore the Backend**:
   Switch to the `backend` branch to view backend specifications and run the mock products database:
   ```bash
   git checkout backend
   ```

---

## 🛠️ Technology Stack & Tools Used
* **Frontend**: React.js, Vite, Redux Toolkit (RTK-Query & Async Thunks)
* **Backend Utilities**: JSON Server (for rapid mockup API testing), Node.js, Express.js (upcoming integration)

Enjoy practicing advanced MERN stack concepts! 🚀
