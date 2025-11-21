import express from "express";
import { 
  getProducts, 
  getProductById, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("manager", "store-keeper"), getProducts);
router.get("/:id", protect, allowRoles("manager", "store-keeper"), getProductById);
router.post("/add", protect, allowRoles("manager"), addProduct);
router.put("/:id", protect, allowRoles("manager"), updateProduct);
router.delete("/:id", protect, allowRoles("manager"), deleteProduct);

export default router;
