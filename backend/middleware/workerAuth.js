const jwt = require("jsonwebtoken");
const Worker = require("../models/Worker");

const workerAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const worker = await Worker.findById(decoded.id).select("-password");

    if (!worker) {
      return res.status(401).json({ message: "Worker not found" });
    }

    req.worker = worker;
    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = workerAuth;