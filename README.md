# ⚙️ Backend Services - Advanced MERN Stack Practice

This branch holds the backend services and mock databases of the MERN Stack practice project.

The backend is architected to support two distinct components:
1. **Mock Products API**: Run using **JSON Server** to handle product catalog queries and modifications on port `3000`.
2. **Core Authentication & Business Logic (Express/Node.js)**: Designed to handle authentications, user management, and other secure API logic. (Backend files will be added here).

---

## 📦 1. Mock Products API Setup (JSON Server)

For rapid development and practicing advanced data queries (such as RTK Query pagination, filtering, and caching), the products database is mocked using `json-server`.

### Running the Products Server
You do not need to install `json-server` globally. You can run it directly using `npx`:

```bash
npx json-server --watch db.json --port 3000
```

* **Database File**: `db.json` (will contain the product items schema).
* **Port**: `3000`
* **Resource Endpoint**: `http://localhost:3000/products`

### Mock Product Data Schema
The products API will expect a schema structured as follows:
```json
{
  "products": [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    }
  ]
}
```

---

## 🔐 2. Future Express.js & MongoDB Integration

This branch is prepared for the addition of a custom Express backend. The planned architecture is:

* **Authentication Endpoint**: Express application running on port `5000` (or configured via environment variables) handling user signup, login, JWT token generation, and secure routes.
* **Database**: MongoDB integration using Mongoose for schemas and database operations.
* **API Gateway/Routing**: The frontend will interact with the Express backend for authentication and with the JSON-server (or a unified Express route proxying to JSON-server) for catalog data.

---

## 🚀 How to Run the Backend

1. **Checkout the backend branch**:
   ```bash
   git checkout backend
   ```
2. **Start the JSON Server**:
   Ensure you have your `db.json` file in the root of the directory, then run:
   ```bash
   npx json-server --watch db.json --port 3000
   ```
3. **Verify running endpoints**:
   Open `http://localhost:3000/products` in your browser.
