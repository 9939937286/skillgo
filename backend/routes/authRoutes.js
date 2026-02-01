const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== "worker@test.com" || password !== "123456") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 🔑 TOKEN PAYLOAD (FINAL STANDARD)
  const token = jwt.sign(
    {
      id: "worker123",
      role: "worker",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;