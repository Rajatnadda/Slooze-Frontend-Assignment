import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Icon from "../components/Icon";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.role) {
      setErr("Please select a role");
      return;
    }

    setLoading(true);

    try {
      await register(form);
      nav("/login");
    } catch (error) {
      console.error(error);
      setErr(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center flex items-center justify-center gap-2">
          <Icon name="UserAdd" className="h-7 w-7 text-indigo-600" />
          Register Account
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={loading}
          />

          <input
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            disabled={loading}
          />

          <input
            type="password"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            disabled={loading}
          />

          <select
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
            disabled={loading}
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            <option value="manager">Manager (Full Access)</option>
            <option value="store-keeper">
              Store Keeper (Inventory Access)
            </option>
          </select>

          {err && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium">
              {err}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
            disabled={loading}
          >
            {loading ? (
              <>
                <Icon name="Loading" className="animate-spin h-5 w-5" />
                Processing...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-700 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => nav("/login")}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Log in here
          </button>
        </div>
      </div>
    </div>
  );
}
