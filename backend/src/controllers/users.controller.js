// users.controller.js

exports.getUsers = (req, res) => {
  res.json({
    status: "success",
    message: "Users controller working",
    data: [],
  });
};

exports.createUser = (req, res) => {
  const userData = req.body;

  res.json({
    status: "success",
    message: "User created (temporary without DB)",
    data: userData,
  });
};