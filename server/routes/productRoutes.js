const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

// Set up routes for product operations in Cluster 2
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);

module.exports = router;
