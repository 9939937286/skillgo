const express = require("express");
const router = express.Router();

const { getJobApplications } = require("../controllers/companyJobController");
const { protectCompany } = require("../middleware/authMiddleware");

router.get(
  "/job/:jobId/applications",
  protectCompany,
  getJobApplications
);

module.exports = router;