const express = require("express");
const router = express.Router();

const { applyJob } = require("../controllers/jobApplicationController");
const { protect } = require("../middleware/authMiddleware");

/* =========================
   Worker Apply Job
========================= */
router.post("/apply", protect, applyJob);

module.exports = router;