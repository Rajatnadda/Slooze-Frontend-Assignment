import Product from "../models/Product.js";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};
export const addProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const product = new Product({ name, price, quantity });
    await product.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
