const express = require("express");
const router = express.Router();

const usersRoute = require("./users");

router.get("/", (req, res) => {
  res.send("SkillGo API Working");
});

router.use("/users", usersRoute);

module.exports = router;