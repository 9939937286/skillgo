const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id);

    if (!company) {
      return res.status(401).json({ message: "Company not found" });
    }

    req.company = company;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};