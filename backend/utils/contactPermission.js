module.exports = function canContact(jobStatus) {
  return ["MATCHED", "APPROVED", "ACTIVE"].includes(jobStatus);
};