const Job = require("../models/Job");

exports.getWorkerJobs = async (req, res) => {
  const workerId = req.user.id; // middleware se
  const jobs = await Job.find({ "applicants.worker": workerId });

  const result = jobs.map(j => {
    const a = j.applicants.find(x => x.worker === workerId);
    return {
      jobId: j._id,
      title: j.title,
      company: j.company,
      description: j.description,
      status: a.status,
      appliedAt: a.appliedAt,
      actionAt: a.actionAt || null
    };
  });

  res.json({ totalJobs: result.length, jobs: result });
};