const express = require("express");
const router = express.Router();

router.get("/protected", (req, res) => {
  res.json({
    success: true,
    message: "Protected route working ✅",
  });
});

module.exports = router;