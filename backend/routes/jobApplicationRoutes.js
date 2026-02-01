const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  applyToJob,
  getCompanyApplicants
} = require("../controllers/jobApplicationController");

router.post("/apply", auth, applyToJob);
router.get("/company/applicants", auth, getCompanyApplicants);

module.exports = router;