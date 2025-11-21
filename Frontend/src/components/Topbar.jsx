import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";
import Icon from "./Icon";

export default function TopBar() {
  const { user, logout } = useAuth();

  return (
    <header
      className="
      flex items-center justify-between 
      px-4 py-3 
      border-b border-gray-200 dark:border-gray-700 
      bg-white dark:bg-gray-800 
      transition-all duration-300
    "
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <h1 className="text-lg sm:text-xl  font-bold text-gray-900 dark:text-white truncate">
          Dashboard
        </h1>

        <div className="hidden sm:block text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          Welcome back, {user?.name?.split(" ")[0]}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div
          className="
          hidden sm:block md:hidden lg:block 
          pr-3 sm:pr-4 
          border-r border-gray-200 dark:border-gray-700
        "
        >
          <div className="font-medium text-gray-900 dark:text-white text-right truncate">
            {user?.name}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm capitalize text-right truncate">
            {user?.role}
          </div>
        </div>

        <ThemeToggle />

        <button
          onClick={logout}
          className="
            p-2 
            rounded-full 
            text-red-600 
            hover:bg-red-50 dark:hover:bg-red-900/20 
            transition-colors
          "
          title="Logout"
        >
          <Icon name="Logout" className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </header>
  );
}
