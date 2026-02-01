module.exports = (req, res, next) => {
  try {
    // authMiddleware se req.user aa chuka hoga
    if (!req.user || req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Company only."
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};