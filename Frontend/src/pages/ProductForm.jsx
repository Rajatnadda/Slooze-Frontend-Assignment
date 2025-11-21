import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import API from "../api/api";
import Icon from "../components/Icon";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, triggerDataRefresh } = useAuth();

  const isEditMode = Boolean(id);

  const normalizedRole = user?.role?.toLowerCase().trim();
  const canModify =
    normalizedRole === "manager" || normalizedRole === "store-keeper";

  if (!canModify) {
    return (
      <div className="p-8 text-center text-red-600 dark:text-red-400">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>You must be a Manager or Storekeeper to add/edit products.</p>
      </div>
    );
  }

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(isEditMode);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isEditMode) return;

    setDataLoading(true);

    API.get(`/products/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => {
        setMessage({ type: "error", text: "Product not found." });
      })
      .finally(() => setDataLoading(false));
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = { ...form };
      if (isEditMode) {
        delete payload._id;
        delete payload.__v;
      }

      if (isEditMode) {
        await API.put(`/products/${id}`, payload);
        setMessage({ type: "success", text: "Product updated successfully!" });
      } else {
        await API.post(`/products/add`, payload);
        setMessage({ type: "success", text: "Product added successfully!" });
      }

      triggerDataRefresh();
      setTimeout(() => navigate("/products"), 400);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save product.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="p-8 text-center text-indigo-600">
        <Icon name="Loading" className="animate-spin h-6 w-6 inline-block" />
        Loading product data...
      </div>
    );
  }

  return (
    <main className="py-8 md:p-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Icon
            name={isEditMode ? "Edit" : "Add"}
            className="h-7 w-7 text-indigo-600"
          />
          {isEditMode ? "Edit Product" : "Add Product"}
        </h2>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                required
                min="0"
                className="w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="py-3 px-6 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="py-3 px-6 bg-indigo-600 text-white rounded-lg"
            >
              {loading
                ? "Processing..."
                : isEditMode
                ? "Save Changes"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
