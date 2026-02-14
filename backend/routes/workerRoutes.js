// routes/workerRoutes.js

const express = require("express");
const router = express.Router();

const {
  registerWorker,
  loginWorker,
  getWorkerJobs,
  applyJob,
} = require("../controllers/workerController");

// Auth
router.post("/register", registerWorker);
router.post("/login", loginWorker);

// Jobs
router.get("/jobs", getWorkerJobs);
router.post("/apply/:jobId", applyJob);

module.exports = router;