const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser
} = require("../controllers/users.controller");

// GET users
router.get("/", getUsers);

// POST user
router.post("/", createUser);

module.exports = router;