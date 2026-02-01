const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const company = await Company.findById(decoded.id).select("-password");
    if (!company) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.company = company; // 👈 ownership ke liye
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};