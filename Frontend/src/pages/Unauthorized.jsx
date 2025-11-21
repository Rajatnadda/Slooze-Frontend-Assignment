import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
        <Icon
          name="Lock"
          className="mx-auto h-12 w-12 text-red-500 dark:text-red-400 mb-4"
        />

        <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          Access Denied
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You do not have the necessary permissions (or role) to view this page.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition shadow-md"
        >
          <Icon name="Home" className="h-5 w-5 mr-2" />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
