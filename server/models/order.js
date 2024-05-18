const mongoose = require("mongoose");

// Define Order Schema in Cluster 3
const orderSchemaCluster3 = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model in Cluster 2
  },
  quantity: {
    type: Number,
    required: true,
  },
  // Add more fields as needed for your Order schema in Cluster 3
});

// Create a new connection to Cluster 3
const cluster3Connection = mongoose.createConnection(
  process.env.MONGO_URL_CLUSTER3
);

// Define and export the Order model within Cluster 3
const Order = cluster3Connection.model("Order", orderSchemaCluster3);

module.exports = Order;
