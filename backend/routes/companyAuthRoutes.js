const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await Company.findOne({ email });
  if (exists) return res.status(400).json({ message: "Company already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const company = await Company.create({ name, email, password: hashed });

  res.status(201).json({
    message: "Company registered successfully",
    companyId: company._id
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const company = await Company.findOne({ email });
  if (!company) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, company.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: company._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
    company: {
      id: company._id,
      name: company.name,
      email: company.email
    }
  });
});

module.exports = router;