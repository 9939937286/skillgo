const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Protected test route
router.get("/", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed ✅",
    user: req.user
  });
});

module.exports = router;