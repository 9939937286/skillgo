const express = require("express");
const router = express.Router();

const {
  registerCompany,
  loginCompany
} = require("../controllers/authController");

router.post("/register/company", registerCompany);
router.post("/login/company", loginCompany);

module.exports = router;