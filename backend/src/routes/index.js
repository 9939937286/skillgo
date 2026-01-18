const express = require("express");
const router = express.Router();

const usersRoutes = require("./users");

router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "SkillGo API root working",
  });
});

router.use("/users", usersRoutes);

module.exports = router;