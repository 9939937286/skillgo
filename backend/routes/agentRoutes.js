const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== "worker@test.com" || password !== "123456") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // IMPORTANT: user object
  const user = {
    id: "worker123",
    role: "worker",
  };

  const token = jwt.sign(
    { user }, // 👈 user object ke andar wrap
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;