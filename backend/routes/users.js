const express = require("express");
const router = express.Router();

// Temporary users data
let users = [
  { id: 1, name: "Rakib", role: "Admin" },
  { id: 2, name: "Updated Agent", role: "Agent" }
];

// TEST route
router.get("/test", (req, res) => {
  res.send("users route working");
});

// GET all users
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: users
  });
});

// GET user by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// PUT update user
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, role } = req.body;

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  if (name) users[index].name = name;
  if (role) users[index].role = role;

  res.json({
    success: true,
    message: "User updated successfully",
    data: users[index]
  });
});

// ✅ DELETE user
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const deleted = users.splice(index, 1);

  res.json({
    success: true,
    message: "User deleted successfully",
    data: deleted[0]
  });
});

module.exports = router;