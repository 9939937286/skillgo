// src/routes/users.js

const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
} = require("../controllers/users.controller");

// ROUTES
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

module.exports = router;