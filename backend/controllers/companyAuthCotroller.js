const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Company Register
 */
exports.registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (error) {
    console.error("Company Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Company Login
 */
exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: company._id, role: "company" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // ✅ FIXED
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      company: {
        id: company._id,
        name: company.name,
        email: company.email,
      },
    });
  } catch (error) {
    console.error("Company Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};