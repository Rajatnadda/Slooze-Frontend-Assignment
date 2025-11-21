import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import Product from "../models/Product.js"; 
const router = express.Router();

router.get(
  "/",
  protect,
  allowRoles("manager"), 
  async (req, res) => {
    try {
      const totalProducts = await Product.countDocuments();
      const lowStockItems = await Product.countDocuments({ quantity: { $lt: 10 } });
      const lastUpdatedProduct = await Product.findOne().sort({ updatedAt: -1 });
      const stats = {
        totalProducts: totalProducts,
        lowStockItems: lowStockItems,
        lastUpdated: lastUpdatedProduct ? lastUpdatedProduct.updatedAt : null, // Return null if no products
      };

    
      res.json(stats);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;