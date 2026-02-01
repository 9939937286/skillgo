const express = require("express");
const router = express.Router();

const workerAuthMiddleware = require("../middlewares/workerAuthMiddleware");
const { getAllJobs } = require("../controllers/workerJobController");

router.get("/jobs", workerAuthMiddleware, getAllJobs);

module.exports = router;