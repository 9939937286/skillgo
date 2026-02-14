const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    // Header check
    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Bearer token split
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};