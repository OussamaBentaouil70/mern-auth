const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: true },
});

const Rule = mongoose.model("Rule", ruleSchema);

module.exports = { Rule, ruleSchema };
