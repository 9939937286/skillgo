// src/controllers/users.controller.js

// GET all users
exports.getUsers = (req, res) => {
  return res.json({
    status: "success",
    message: "Users list fetched successfully",
    data: [],
  });
};

// GET single user
exports.getUserById = (req, res) => {
  const { id } = req.params;

  return res.json({
    status: "success",
    message: "Single user fetched successfully",
    userId: id,
  });
};

// CREATE user (dummy)
exports.createUser = (req, res) => {
  return res.json({
    status: "success",
    message: "User created successfully (dummy)",
    payload: req.body,
  });
};