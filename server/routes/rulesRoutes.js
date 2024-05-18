const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cors = require("cors");

const {
  getRulesByTag,
  generateText,
} = require("../controllers/rulesController");

router.use(authenticate);
//middleware
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

router.get("/rules_by_tag", getRulesByTag);
router.post("/generate", generateText);

module.exports = router;
