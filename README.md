# 🖥️ Frontend Applications - Advanced Redux & MERN Practice

This branch holds the frontend codebase of the MERN Stack practice project. It features two React applications built with **Vite** that demonstrate professional-grade state management and API integration patterns using **Redux Toolkit**.

---

## 📂 Project Directories

### 1. 🔗 `RTK-Query`
This application showcases **declarative data fetching and caching** using Redux Toolkit's **RTK Query** layer. It represents the modern standard for interacting with REST APIs in React applications, eliminating the need to write manual fetch requests, async actions, or loading state reducers.

* **Key Implementations**:
  * **API Slice Definition**: Centralized API service defining endpoints for queries (e.g. fetching products) and mutations (adding, updating, deleting).
  * **Auto-generated Hooks**: Utilizing hooks like `useGetProductsQuery` for automatic caching, polling, and loading/error state handling.
  * **Cache Invalidation & Tagging**: Implementing query cache invalidation (`providesTags` and `invalidatesTags`) to ensure the UI instantly syncs when data updates.

### 2. ⚡ `asyncThunk`
This application showcases **imperative async state management** using **Redux Toolkit's `createAsyncThunk`**. This is essential for operations that involve complex workflows, side effects, or local state processing before hitting the Redux store.

* **Key Implementations**:
  * **Async Action Creators**: Defining thunks like `fetchProducts` that manage promise resolution lifecycle states (`pending`, `fulfilled`, `rejected`).
  * **Extra Reducers**: Customizing slice state updates based on the promise states within the `extraReducers` builder callback.
  * **Action Dispatching**: Explicitly calling thunk actions inside React components and managing response payloads.

---

## 🛠️ Getting Started & Local Execution

Both applications are configured as standalone React projects using Vite. To install dependencies and run either of them, follow these instructions:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16+ recommended) and the products backend running on port `3000` (refer to the `backend` branch for instructions).

### Setup & Run `RTK-Query`
1. Navigate to the project directory:
   ```bash
   cd RTK-Query
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser (usually `http://localhost:5173`).

---

### Setup & Run `asyncThunk`
1. Navigate to the project directory:
   ```bash
   cd asyncThunk
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser (usually `http://localhost:5173`).

---

## 💡 Key Architectural Concepts Practiced
* **Declarative vs. Imperative Data Fetching**: Comparing the code complexity and boilerplate of RTK Query vs. manual Thunks.
* **Global State Architecture**: Structuring a scalable Redux store with multiple slice reducers and middleware.
* **Loading and Error States**: Standardizing visual feedback patterns during network operations.
