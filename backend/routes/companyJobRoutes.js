const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/companyJobController");
const auth = require("../middleware/auth");

router.post("/job/create", auth, createJob);

module.exports = router;