const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// LOGIN ROUTE (REAL JWT)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // temporary hardcoded user (abhi DB baad me)
  if (email === "company@test.com" && password === "123456") {
    const token = jwt.sign(
      { id: "COMPANY_001", role: "company" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

module.exports = router;