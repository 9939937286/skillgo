/**
 * In-Memory Job Store
 * -------------------
 * NOTE:
 * - MongoDB intentionally OFF
 * - Data RAM me store hota hai
 * - Server restart pe data reset ho jayega
 * - Structure future DB ke liye ready hai
 */

const jobs = [];

/**
 * Add new job
 */
const addJob = (job) => {
  jobs.push(job);
  return job;
};

/**
 * Get all jobs
 */
const getAllJobs = () => {
  return jobs;
};

/**
 * Get jobs by companyId
 */
const getJobsByCompany = (companyId) => {
  return jobs.filter((job) => job.companyId === companyId);
};

/**
 * Get single job by jobId
 */
const getJobById = (jobId) => {
  return jobs.find((job) => job.jobId === jobId);
};

/**
 * Update job
 */
const updateJob = (jobId, updates) => {
  const index = jobs.findIndex((job) => job.jobId === jobId);
  if (index === -1) return null;

  jobs[index] = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date()
  };

  return jobs[index];
};

/**
 * Delete job
 */
const deleteJob = (jobId) => {
  const index = jobs.findIndex((job) => job.jobId === jobId);
  if (index === -1) return null;

  const deleted = jobs.splice(index, 1);
  return deleted[0];
};

module.exports = {
  jobs,
  addJob,
  getAllJobs,
  getJobsByCompany,
  getJobById,
  updateJob,
  deleteJob
};