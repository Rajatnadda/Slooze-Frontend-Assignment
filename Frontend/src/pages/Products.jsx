import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import API from "../api/api";
import Icon from "../components/Icon";

export default function Products() {
  const { user, triggerDataRefresh } = useAuth();
  const isManager = user?.role === "manager";

  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [message, setMessage] = useState(null);

  const load = () => {
    setLoading(true);
    setMessage(null);

    API.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Load error:", err);
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to load product data.",
        });
        setProducts([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openDeleteModal = (id) => {
    setDeleteError(null);
    setDeleteCandidate(id);
  };

  const remove = async () => {
    if (!deleteCandidate) return;

    setLoading(true);
    setDeleteError(null);

    try {
      await API.delete(`/products/${deleteCandidate}`);
      setMessage({ type: "success", text: `Product deleted successfully!` });
      setDeleteCandidate(null);
      triggerDataRefresh();
      load();
    } catch (err) {
      setDeleteError(
        err.response?.data?.message ||
          "Delete failed. Check network or server logs."
      );
      console.error("Delete Product Error:", err);
      setLoading(false);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      (p._id && String(p._id).includes(q))
  );

  return (
    <main className="py-8 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
            <Icon name="Products" className="h-7 w-7 text-indigo-600" />
            Products Inventory
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Overview of all stored commodities.
          </p>
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or ID..."
            className="w-full sm:w-64 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          {isManager && (
            <Link
              to="/products/add"
              className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition shadow-md"
            >
              <Icon name="Add" className="h-5 w-5" />
              Add
            </Link>
          )}
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
          }`}
        >
          <Icon
            name={message.type === "success" ? "Check" : "Warning"}
            className="h-5 w-5"
          />
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-x-auto border border-gray-200 dark:border-gray-700">
        {loading ? (
          <div className="p-6 text-center flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">
            <Icon name="Loading" className="animate-spin mr-3 h-5 w-5" />
            Loading Products...
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">
                  Name
                </th>
                <th className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">
                  Qty
                </th>
                <th className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">
                  Price
                </th>
                <th className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filtered.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-100">
                    {p.name}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        p.quantity < 10
                          ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400"
                          : p.quantity < 50
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400"
                          : "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                      }`}
                    >
                      {p.quantity}
                    </span>
                  </td>

                  <td className="p-4 text-gray-900 dark:text-gray-100">
                    ₹{parseFloat(p.price).toFixed(2)}
                  </td>

                  <td className="p-4 flex gap-2 flex-wrap">
                    {isManager ? (
                      <>
                        <Link
                          to={`/products/edit/${p._id}`}
                          className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-md flex items-center gap-1 text-sm"
                        >
                          Edit <Icon name="Edit" className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() => openDeleteModal(p._id)}
                          className="px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-md flex items-center gap-1 text-sm"
                        >
                          Delete <Icon name="Delete" className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic dark:text-gray-600">
                        No actions allowed
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {q
                      ? `No products found matching "${q}".`
                      : "No products available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {deleteCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-4">
              <Icon name="Alert" className="h-6 w-6" />
              Confirm Deletion
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>

            {deleteError && (
              <p className="mb-3 p-2 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
                {deleteError}
              </p>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={remove}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Icon name="Loading" className="animate-spin h-4 w-4" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
