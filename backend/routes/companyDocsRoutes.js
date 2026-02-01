const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

/**
 * @route   GET /api/company/docs
 * @desc    Get company documents
 * @access  Private (Company)
 */
router.get("/docs", auth, (req, res) => {
  res.status(200).json({
    message: "Company documents fetched",
    companyId: req.user.id,
    role: req.user.role,
    documents: [],
  });
});

module.exports = router;