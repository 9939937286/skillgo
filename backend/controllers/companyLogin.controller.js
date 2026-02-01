const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const companyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
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
      {
        id: company._id,
        role: "company",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      loginId: company.email,   // ✅ LOGIN ID
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

module.exports = companyLogin;