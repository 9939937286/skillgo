const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");

// GET /api/protected
router.get("/", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;