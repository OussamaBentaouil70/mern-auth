const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  fonction: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" }, // Optional reference to the owner
  members: [{ type: Schema.Types.ObjectId, ref: "User" }], // Optional reference to member users
});

const User = mongoose.model("User", userSchema);

module.exports = User;
