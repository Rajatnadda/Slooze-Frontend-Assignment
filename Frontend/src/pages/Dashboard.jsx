import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import Icon from "../components/Icon";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { dataVersion } = useAuth();
  const location = useLocation();

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) =>
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data. Check your API server."
        )
      )
      .finally(() => setLoading(false));
  }, [location, dataVersion]);

  const StatCard = ({ title, value, iconName, color }) => (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <Icon
          name={iconName}
          className={`h-10 w-10 ${
            color === "indigo"
              ? "text-indigo-500"
              : color === "red"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        />

        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
      </div>

      <div className="mt-5 text-4xl font-extrabold text-gray-900 dark:text-white break-words">
        {value}
      </div>
    </div>
  );

  return (
    <main className="py-8 md:p-8 lg:p-10">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Icon name="Dashboard" className="h-8 w-8 text-indigo-600" />
          Inventory Overview
        </h2>
      </header>

      {loading && (
        <div className="p-6 text-center rounded-2xl bg-white dark:bg-gray-800 shadow-lg text-indigo-500 font-medium flex items-center justify-center gap-3">
          <Icon name="Loading" className="animate-spin h-6 w-6" />
          Loading Statistics...
        </div>
      )}

      {error && (
        <div className="p-6 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 shadow-lg flex items-center gap-3">
          <Icon name="Warning" className="h-6 w-6" />
          {error}
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <StatCard
            title="Total Products"
            value={stats.totalProducts ?? 0}
            iconName="Products"
            color="indigo"
          />

          <StatCard
            title="Low Stock Items"
            value={stats.lowStockItems ?? 0}
            iconName="Alert"
            color="red"
          />

          <StatCard
            title="Last Updated"
            value={
              stats.lastUpdated
                ? new Date(stats.lastUpdated).toLocaleString()
                : "N/A"
            }
            iconName="Update"
            color="yellow"
          />
        </div>
      )}
    </main>
  );
}
