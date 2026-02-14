const Company = require("../models/Company");

const companyOnly = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const company = await Company.findById(req.user.id);

    if (!company) {
      return res.status(403).json({ message: "Access denied (Company only)" });
    }

    next();
  } catch (error) {
    console.error("COMPANY ONLY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = companyOnly;