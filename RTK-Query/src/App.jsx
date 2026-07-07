import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  Navigate,
} from "react-router";
import ProductDetails from "./components/ProductDetails";
import ProductsPage from "./pages/ProductsPage";
import PostsPage from "./pages/PostsPage";
import PostDetails from "./components/PostDetails";
import Login from "./pages/Login";
import { logout, selectIsAuthenticated } from "./features/slice/auth";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <BrowserRouter>
        <nav className="bg-zinc-900 py-4">
          <div className="flex items-center justify-between mx-auto max-w-6xl px-4">
            <h1 className="text-2xl font-bold text-zinc-50">My Store</h1>
            {/* Nav Links */}
            <div>
              <ul className="flex gap-4 items-center">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-zinc-50 font-semibold"
                        : "text-zinc-400 hover:text-zinc-50"
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/posts"
                    className={({ isActive }) =>
                      isActive
                        ? "text-zinc-50 font-semibold"
                        : "text-zinc-400 hover:text-zinc-50"
                    }
                  >
                    Posts
                  </NavLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2 transition duration-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/" element={<ProductsPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/create" element={<PostDetails />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<div>Page not found</div>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

const ProtectedRoute = () => {
  const isAuthenticated = Boolean(useSelector(selectIsAuthenticated))
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
