const express = require("express");
const router = express.Router();
const { getCompanyApplications } = require("../controllers/applicationController");
const auth = require("../middleware/auth"); // JWT middleware

router.get("/company", auth, getCompanyApplications);

module.exports = router;