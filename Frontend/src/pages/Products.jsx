import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import API from "../api/api";
import Icon from "../components/Icon";

const DeleteModal = ({
  deleteCandidate,
  deleteError,
  loading,
  onCancel,
  onConfirm,
}) => {
  if (!deleteCandidate) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Confirm Delete
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        {deleteError && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm mb-4">
            {deleteError}
          </div>
        )}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Icon name="Loading" className="animate-spin h-4 w-4" />
                Deleting...
              </>
            ) : (
              <>
                <Icon name="Delete" className="h-4 w-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const QuantityBadge = ({ quantity }) => {
  const getColor = (qty) => {
    if (qty < 10)
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400";
    if (qty < 50)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400";
    return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400";
  };

  return (
    <span
      className={`px-3 py-1 text-sm font-semibold rounded-full ${getColor(
        quantity
      )}`}
    >
      {quantity}
    </span>
  );
};
const ProductRow = ({ product, isManager, isStorekeeper, onDelete }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
    <td className="p-4 font-medium text-gray-900 dark:text-gray-100">
      {product.name}
    </td>
    <td className="p-4">
      <QuantityBadge quantity={product.quantity} />
    </td>
    <td className="p-4 text-gray-900 dark:text-gray-100">
      ₹{parseFloat(product.price).toFixed(2)}
    </td>
    <td className="p-4 flex gap-2 flex-wrap">
      {(isManager || isStorekeeper) && (
        <Link
          to={`/products/edit/${product._id}`}
          className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-md flex items-center gap-1 text-sm"
        >
          Edit <Icon name="Edit" className="h-4 w-4" />
        </Link>
      )}
      {isManager && (
        <button
          onClick={() => onDelete(product._id)}
          className="px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-md flex items-center gap-1 text-sm"
        >
          Delete <Icon name="Delete" className="h-4 w-4" />
        </button>
      )}
      {!(isManager || isStorekeeper) && (
        <span className="text-xs text-gray-400 italic">No actions allowed</span>
      )}
    </td>
  </tr>
);

export default function Products() {
  const { user, triggerDataRefresh } = useAuth();

  const normalizedRole = user?.role?.toLowerCase().trim();
  const isManager = normalizedRole === "manager";
  const isStorekeeper = normalizedRole === "store-keeper";

  const canEditOrAdd = isManager || isStorekeeper;

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

          {canEditOrAdd && (
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

      {deleteCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            {deleteError && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm mb-4">
                {deleteError}
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteCandidate(null)}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={remove}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Icon name="Loading" className="animate-spin h-4 w-4" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Icon name="Delete" className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
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
                    {(isManager || isStorekeeper) && (
                      <Link
                        to={`/products/edit/${p._id}`}
                        className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-md flex items-center gap-1 text-sm"
                      >
                        Edit <Icon name="Edit" className="h-4 w-4" />
                      </Link>
                    )}

                    {isManager && (
                      <button
                        onClick={() => openDeleteModal(p._id)}
                        className="px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-md flex items-center gap-1 text-sm"
                      >
                        Delete <Icon name="Delete" className="h-4 w-4" />
                      </button>
                    )}

                    {!canEditOrAdd && (
                      <span className="text-xs text-gray-400 italic">
                        No actions allowed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
