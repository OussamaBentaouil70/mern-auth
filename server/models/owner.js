const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  fonction: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }], // Reference to Member model
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
