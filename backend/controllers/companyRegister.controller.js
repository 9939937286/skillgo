const Company = require("../models/Company");
const bcrypt = require("bcryptjs");

const companyRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Company.findOne({ email });
    if (exists) {
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
      message: "Company registered",
      companyId: company._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Register failed" });
  }
};

module.exports = companyRegister;