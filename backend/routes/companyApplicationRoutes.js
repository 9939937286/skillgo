const express = require("express");
const router = express.Router();
const JobApplication = require("../models/JobApplication");
const auth = require("../middleware/auth");

// ✅ Company dashboard – view applications
router.get("/applications", auth, async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only company allowed" });
    }

    const applications = await JobApplication.find({
      company: req.user.id,
    })
      .populate("job", "title category salaryAmount")
      .populate("worker", "name phone");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update application status
router.put("/applications/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const application = await JobApplication.findOneAndUpdate(
      { _id: req.params.id, company: req.user.id },
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;