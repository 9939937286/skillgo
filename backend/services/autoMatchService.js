// services/autoMatchService.js

function autoMatch(job, agents = [], manpower = []) {
  const matchedAgents = agents.filter(
    a => a.category === job.category && a.active === true
  );

  const matchedWorkers = manpower.filter(
    w => w.category === job.category && w.available === true
  );

  return {
    agents: matchedAgents,
    workers: matchedWorkers
  };
}

module.exports = autoMatch;