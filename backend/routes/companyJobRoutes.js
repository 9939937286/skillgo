const express = require("express");
const router = express.Router();

const {
  createJob,
  getCompanyJobs,
} = require("../controllers/companyJobController");

const authCompany = require("../middleware/authCompany");

router.post("/jobs", authCompany, createJob);
router.get("/jobs", authCompany, getCompanyJobs);

module.exports = router;