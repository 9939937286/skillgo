exports.getCompanyDocs = (req, res) => {
  res.status(200).json({
    message: "Company documents fetched",
    companyId: req.user.id,
    documents: []
  });
};

exports.uploadCompanyDoc = (req, res) => {
  res.status(201).json({
    message: "Company document uploaded",
    companyId: req.user.id
  });
};