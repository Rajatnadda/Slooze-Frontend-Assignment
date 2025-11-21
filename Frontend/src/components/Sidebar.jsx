import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "Dashboard",
    roles: ["manager"],
  },
  {
    to: "/products",
    label: "Products",
    icon: "Products",
    roles: ["manager", "store-keeper"],
  },
  {
    to: "/products/add",
    label: "Add Product",
    icon: "Add",
    roles: ["manager", "store-keeper"],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const role = user?.role || "";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-indigo-600  text-white p-2 rounded-lg shadow-md"
      >
        <Icon name="Menu" className="h-6 w-6" />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
        ></div>
      )}

      <aside
        className={`
          fixed lg:static 
          top-0 left-0 h-full w-64 
          bg-white dark:bg-gray-800 
          border-r border-gray-200 dark:border-gray-700 
          p-4 flex flex-col 
          transition-all duration-300 
          z-50
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between mb-8 p-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Icon name="Products" className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Slooze
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-600 dark:text-gray-300 p-1"
          >
            <Icon name="Close" className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {links.map((item) =>
            item.roles.includes(role) ? (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-semibold"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <Icon name={item.icon} className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            ) : null
          )}
        </nav>
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 capitalize">
              {user?.role}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <ThemeToggle />

            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Logout"
            >
              <Icon name="Logout" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
