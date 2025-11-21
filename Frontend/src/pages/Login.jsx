import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Icon from "../components/Icon";
export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await login(form);
    } catch (error) {
      console.error("Login Error Details:", error);
      console.error("API URL:", import.meta.env.VITE_API_URL);
      setErr(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Check server connection or credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
            Slooze Inventory
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to manage your commodities.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Email"
            value={form.email}
            onChange={handleFormChange}
          />

          <input
            type="password"
            name="password"
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Password"
            value={form.password}
            onChange={handleFormChange}
          />

          {err && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-2 text-sm">
              <Icon name="Warning" className="h-4 w-4" />
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <Icon name="Loading" className="animate-spin mr-2 h-5 w-5" />
                Authenticating...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
