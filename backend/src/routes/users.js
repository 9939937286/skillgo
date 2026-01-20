const express = require("express");
const router = express.Router();

// TEMP memory (database नहीं)
let users = [];

// POST API
router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name aur Email required hai"
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User save ho gaya",
    data: newUser
  });
});

// GET API (check ke liye)
router.get("/", (req, res) => {
  res.json(users);
});

module.exports = router;