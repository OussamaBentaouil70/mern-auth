const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");

// Route to create a new order
router.post("/", orderControllers.createOrder);

// Route to get all orders
router.get("/", orderControllers.getAllOrders);

// Route to get orders by product_id
router.get("/:product_id", orderControllers.getOrdersByProductId);

module.exports = router;
