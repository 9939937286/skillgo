const express = require("express");
const router = express.Router();
const { applyForJob } = require("../controllers/workerJobController");
const auth = require("../middleware/auth");

// Worker apply job
router.post("/apply/:jobId", auth, applyForJob);

module.exports = router;