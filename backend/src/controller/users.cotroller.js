exports.getUsers = (req, res) => {
  res.json({
    success: true,
    message: "Users fetched successfully",
    data: []
  });
};