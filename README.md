# ⚙️ Backend Services - Advanced MERN Stack Practice

This branch holds the backend services, database schemas, authentication middleware, and mock databases of the MERN Stack practice project.

The backend consists of two coexisting servers:
1. **Express & Node.js Application (Port `8000`)**: Handles user authentication, user management, and post creation using MongoDB & Mongoose.
2. **JSON Server (Port `3000`)**: A lightweight mock database for serving and updating the products catalog.

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running locally on `mongodb://127.0.0.1:27017/`)

---

## 🔐 1. Express & Node.js Server Setup (Authentication & Core API)

This server handles session-based JWT authentication, custom middleware checks, role validation, and MongoDB CRUD operations.

### Configuration
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   Copy `.env.example` to `.env.local` in this folder:
   ```bash
   cp .env.example .env.local
   ```
   Modify `.env.local` with your database URI and secrets:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://127.0.0.1:27017/learning1
   ACCESS_TOKEN_SECRET=your_secret_access_key
   REFRESH_TOKEN_SECRET=your_secret_refresh_key
   ```

### Running the Server
Run the development server (uses `nodemon` with `--env-file=.env.local` to load environment variables):
```bash
npm run dev
```
The server will start at `http://localhost:8000/`.

### 🍃 Database Seeding
To seed your local MongoDB with dummy posts and user references, run the seeding script:
```bash
node seedPosts.js
```

---

## 🏷️ API Endpoints Reference

All core Express routes are prefixed with `/api`.

### 👤 Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---|
| **POST** | `/api/auth/register` | Register a new user | No |
| **POST** | `/api/auth/login` | Login user, set HTTP-Only cookie, return Access Token | No |
| **POST** | `/api/auth/refresh` | Refresh expired access token using cookie | No |
| **POST** | `/api/auth/logout` | Clear HTTP-Only refresh cookie and logout | No |

### 👥 User Routes (`/api/users`)
| Method | Endpoint | Description | Auth Required | Roles Required |
|:---|:---|:---|:---|:---|
| **POST** | `/api/users/` | Create a new user | Yes | `admin`, `editor` |
| **GET** | `/api/users/` | List all users | Yes | `admin`, `editor`, `user` |
| **GET** | `/api/users/:id` | Get details of a user | No | - |
| **PUT** | `/api/users/:id` | Update user details | Yes | `admin`, `editor` |
| **DELETE**| `/api/users/:id` | Delete a user | Yes | `admin` |

### 📝 Post Routes (`/api/posts`)
| Method | Endpoint | Description | Auth Required | Constraints |
|:---|:---|:---|:---|:---|
| **POST** | `/api/posts/` | Create a new post | Yes | Validated content, role check |
| **GET** | `/api/posts/` | List all posts | No | - |
| **GET** | `/api/posts/:id` | Get post by id | No | - |
| **PUT** | `/api/posts/:id` | Update post | Yes | Must be post owner |
| **DELETE**| `/api/posts/:id` | Delete post | Yes | Must be post owner |

---

## 📦 2. Products Catalog Mock API Setup (JSON Server)

A lightweight `json-server` instance runs separately to manage the products catalog.

### Running the Products Server
Start the database mock server on port `3000`:
```bash
npx json-server --watch db.json --port 3000
```
- **Database Source**: `db.json`
- **Resource Endpoint**: `http://localhost:3000/products`
- **CORS Allowed Origins**: Configured to connect directly with the frontend clients.
