const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    ultraMode: "Owner Geo Control Engine 🌍",
    control: {
      country: "India",
      state: "Bihar",
      district: "East Champaran",
      ownerLevel: "Supreme Owner Access 👑"
    }
  });
});

module.exports = router;