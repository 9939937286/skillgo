const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// ===== TEMP MEMORY (MongoDB nahi hai isliye) =====
let jobs = [];
let applications = [];
let jobIdCounter = 1;
let appIdCounter = 1;

// ================= CREATE JOB =================
router.post("/create", auth, (req, res) => {
  const job = {
    id: jobIdCounter++,
    title: req.body.title || "Hotel Staff",
    category: req.body.category || "hotel",
    workType: req.body.workType || "monthly",
    quantity: req.body.quantity,
    location: req.body.location,
    duration: req.body.duration,
    budget: req.body.budget,
    agentRequired: req.body.agentRequired || false,
    clientId: req.user.id,
    status: "OPEN"
  };

  jobs.push(job);

  res.json({
    success: true,
    message: "Job created",
    job
  });
});

// ================= APPLY JOB =================
router.post("/apply/:jobId", auth, (req, res) => {
  const job = jobs.find(j => j.id == req.params.jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const application = {
    id: appIdCounter++,
    jobId: job.id,
    userId: req.user.id,
    role: req.user.role,
    status: "APPLIED",
    createdAt: new Date()
  };

  applications.push(application);

  res.json({
    success: true,
    message: "Applied successfully",
    application
  });
});

// ================= VERIFY =================
router.post("/verify/:appId", auth, (req, res) => {
  const app = applications.find(a => a.id == req.params.appId);
  if (!app) {
    return res.status(404).json({ message: "Application not found" });
  }

  app.status = "VERIFIED";

  res.json({
    success: true,
    message: "Application verified",
    application: app
  });
});

// ================= APPROVE =================
router.post("/approve/:appId", auth, (req, res) => {
  const app = applications.find(a => a.id == req.params.appId);
  if (!app) {
    return res.status(404).json({ message: "Application not found" });
  }

  app.status = "APPROVED";

  res.json({
    success: true,
    message: "Application approved",
    application: app
  });
});

// ================= AGREEMENT =================
router.post("/agreement/:appId", auth, (req, res) => {
  const app = applications.find(a => a.id == req.params.appId);
  if (!app) {
    return res.status(404).json({ message: "Application not found" });
  }

  app.status = "ACTIVE";

  res.json({
    success: true,
    message: "Agreement created & Job ACTIVE",
    application: app
  });
});

// ================= CAN CONTACT =================
router.get("/can-contact/:appId", auth, (req, res) => {
  const app = applications.find(a => a.id == req.params.appId);
  if (!app) {
    return res.status(404).json({ message: "Application not found" });
  }

  const canContact = app.status === "ACTIVE";

  res.json({
    success: true,
    applicationId: app.id,
    status: app.status,
    canContact
  });
});

module.exports = router;