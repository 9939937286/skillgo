const express = require("express");
const router = express.Router();

const userRoutes = require("./userroutes");

router.use("/users", userRoutes);

module.exports = router;