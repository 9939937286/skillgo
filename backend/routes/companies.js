const express = require("express");
const router = express.Router();

const Company = require("../models/Company");
const User = require("../models/User");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// 🔒 Only ADMIN can create company
router.post(
  "/create",
  auth,
  role(["admin"]),
  async (req, res) => {
    try {
      const { name, email, ownerName, phone } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: "Name & Email required" });
      }

      // 1) Create Company
      const company = await Company.create({
        name,
        email,
        ownerName,
        phone,
        createdBy: req.user.id
      });

      // 2) Create/Login User for Company
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: name,
          email: email,
          password: "123456", // demo password (later change)
          role: "company"
        });
      } else {
        user.role = "company";
        await user.save();
      }

      res.status(201).json({
        message: "Company created successfully ✅",
        company,
        companyUser: { email: user.email, role: user.role }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;