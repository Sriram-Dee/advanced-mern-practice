import React, { useState } from "react";
import { useLoginUserMutation } from "../features/api/usersApi";
import { login } from "../features/slice/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [loginUser, { data, isLoading, isError, error }] =
    useLoginUserMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    let user;
    e.preventDefault();
    try {
      user = await loginUser(loginForm).unwrap();
      navigate("/posts", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">Welcome Back</h1>
          <p className="text-zinc-500 mt-2">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
              onChange={(e) =>
                setLoginForm({
                  ...loginForm,
                  password: e.target.value,
                })
              }
            />
          </div>
          
          {isError && <p className="text-red-500">{error.data.message}</p>}

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-3 rounded-lg font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all duration-200"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
