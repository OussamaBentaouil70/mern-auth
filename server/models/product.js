const mongoose = require("mongoose");

// Define Product Schema in Cluster 2
const productSchemaCluster2 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
});

// Create a new connection to Cluster 2
const cluster2Connection = mongoose.createConnection(
  process.env.MONGO_URL_CLUSTER2
);

// Define and export the Product model within Cluster 2
const Product = cluster2Connection.model("Product", productSchemaCluster2);

module.exports = Product;
