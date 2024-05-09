const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  fonction: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "Owner" }, // Reference to the Owner model
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
