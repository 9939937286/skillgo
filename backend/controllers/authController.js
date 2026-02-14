const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

exports.registerCompany = async (req, res) => {
  try {
    const { companyName, email, password } = req.body;

    if (!companyName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Company.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Company already registered" });
    }

    const company = await Company.create({
      companyName,
      email,
      password
    });

    res.status(201).json({
      message: "Company registered successfully",
      company: {
        id: company._id,
        companyName: company.companyName,
        email: company.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const isMatch = await company.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { companyId: company._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};