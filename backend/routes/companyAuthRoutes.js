const express = require("express");
const router = express.Router();

const register = require("../controllers/companyRegister.controller");
const login = require("../controllers/companyLogin.controller");

router.post("/register", register);
router.post("/login", login);

module.exports = router;