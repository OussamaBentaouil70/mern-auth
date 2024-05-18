const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cors = require("cors");
const {
  createMemberByOwner,
  updateMemberByOwner,
  deleteMemberByOwner,
  listMembersByOwner,
  getMemberById,
} = require("../controllers/ownerController");

// Apply the authentication middleware to all owner routes
router.use(authenticate);
//middleware
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Set up routes for owner-specific operations
router.post("/members", createMemberByOwner);
router.put("/members/:userId", updateMemberByOwner);
router.delete("/members/:userId", deleteMemberByOwner);
router.get("/members", listMembersByOwner);
router.get("/members/:memberId", getMemberById);

module.exports = router;
