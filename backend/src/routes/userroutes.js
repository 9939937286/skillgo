const express = require("express");
const router = express.Router();

// TEST
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "SkillGo Users API Working"
  });
});

// REGISTER USER
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  res.json({
    status: "success",
    message: "User registered successfully",
    data: { name, email }
  });
});

module.exports = router;