const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// 👑 Temporary Team Storage
let teamMembers = [];

// Owner Only Middleware
const ownerOnly = (req, res, next) => {
  if (req.user.role !== "company") {
    return res.status(403).json({ message: "Owner Access Only" });
  }
  next();
};

// 👤 Create Member ID
router.post("/create", auth, ownerOnly, (req, res) => {
  const { name, role } = req.body;

  const newMember = {
    id: Date.now(),
    name,
    role,
    active: true,
  };

  teamMembers.push(newMember);

  res.json({
    success: true,
    message: "New Team Member Created 👤",
    member: newMember,
  });
});

// 📋 Get All Members
router.get("/", auth, ownerOnly, (req, res) => {
  res.json({
    success: true,
    teamMembers,
  });
});

// ⛔ Stop Member Access
router.post("/stop", auth, ownerOnly, (req, res) => {
  const { id } = req.body;

  teamMembers = teamMembers.map((m) =>
    m.id === id ? { ...m, active: false } : m
  );

  res.json({
    success: true,
    message: "Member Access Stopped ⛔",
    teamMembers,
  });
});

module.exports = router;