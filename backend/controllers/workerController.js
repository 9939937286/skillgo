// controllers/workerController.js

const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");

// Worker Register
const registerWorker = async (req, res) => {
  res.json({ message: "Worker register OK" });
};

// Worker Login
const loginWorker = async (req, res) => {
  res.json({ message: "Worker login OK" });
};

// Get Jobs for Worker
const getWorkerJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

// Apply Job
const applyJob = async (req, res) => {
  res.json({ message: "Job applied successfully" });
};

module.exports = {
  registerWorker,
  loginWorker,
  getWorkerJobs,
  applyJob,
};