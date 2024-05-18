const Order = require("../models/order");

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      product_id,
      quantity,
      // Add more fields as needed for the order
    });

    // Save the new order to the database
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
};

// Controller function to get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving orders" });
  }
};

// Controller function to get orders by product_id
const getOrdersByProductId = async (req, res) => {
  try {
    const { product_id } = req.params;
    const orders = await Order.find({ product_id });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders by product_id:", error);
    res.status(500).json({
      error: "An error occurred while retrieving orders by product_id",
    });
  }
};

// Export the controller functions for use in routes
module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByProductId,
};
