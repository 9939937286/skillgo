const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createJob,
  getAllJobs,
  getCompanyJobs,
  getJobById,
  deleteJob
} = require("../controllers/jobController");

router.post("/create", authMiddleware, createJob);
router.get("/", getAllJobs);
router.get("/company", authMiddleware, getCompanyJobs);
router.get("/:id", getJobById);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;