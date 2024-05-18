const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// Connect to all MongoDB clusters
const cluster1Connection = mongoose.createConnection(
  process.env.MONGO_URL_CLUSTER1
);
const cluster2Connection = mongoose.createConnection(
  process.env.MONGO_URL_CLUSTER2
);
const cluster3Connection = mongoose.createConnection(
  process.env.MONGO_URL_CLUSTER3
);

// Check connection status for each cluster
cluster1Connection.on("connected", () => {
  console.log("Connected to Cluster 1");
});

cluster2Connection.on("connected", () => {
  console.log("Connected to Cluster 2");
});

cluster3Connection.on("connected", () => {
  console.log("Connected to Cluster 3");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the main MongoDB cluster");
  })
  .catch((e) => {
    console.log("Error while DB connecting", e);
  });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));
app.use("/owner", require("./routes/userRoutes"));
app.use("/rules", require("./routes/rulesRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
