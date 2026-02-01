const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ THIS WAS MISSING / BROKEN
router.get("/me", authMiddleware, getMe);

module.exports = router;