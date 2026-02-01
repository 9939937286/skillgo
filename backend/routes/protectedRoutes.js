const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

/* =========================
   Protected Test Route
========================= */
router.get(
  "/",
  authMiddleware,
  roleMiddleware("company", "agent", "owner"),
  (req, res) => {
    res.json({
      success: true,
      message: "Protected route accessed ✅",
      user: req.user
    });
  }
);

module.exports = router;