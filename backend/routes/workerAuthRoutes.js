const express = require("express");
const router = express.Router();

const {
  registerWorker,
  loginWorker,
} = require("../controllers/workerAuthController");

/* =========================
   Worker Auth Routes
========================= */
router.post("/register", registerWorker);
router.post("/login", loginWorker);

module.exports = router;