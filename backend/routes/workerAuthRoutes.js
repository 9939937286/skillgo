const express = require("express");
const router = express.Router();

const {
  registerWorker,
  loginWorker
} = require("../controllers/workerAuthController");

// REGISTER
router.post("/register", registerWorker);

// LOGIN
router.post("/login", loginWorker);

module.exports = router;