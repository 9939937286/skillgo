const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerCompany = async (req, res) => {
  try {
    const { companyName, email, phone, password } = req.body;

    if (!companyName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const exists = await Company.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Company already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      companyName,
      email,
      phone,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company: {
        id: company._id,
        companyName: company.companyName,
        email: company.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// LOGIN
exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: company._id },
      process.env.JWT_SECRET || "skillgo_secret",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      company: {
        id: company._id,
        companyName: company.companyName,
        email: company.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};