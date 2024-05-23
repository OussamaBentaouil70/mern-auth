const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cors = require("cors");

const {
  getRulesByTag,
  generateText,
  deleteRules,
} = require("../controllers/rulesController");

router.use(authenticate);
//middleware
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Set up routes for rule-specific operations
router.get("/rules_by_tag", getRulesByTag);
router.post("/generate", generateText);
router.delete("/delete_rules", deleteRules);

module.exports = router;
