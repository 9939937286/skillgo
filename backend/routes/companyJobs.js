const express = require("express");
const router = express.Router();

// ✅ TEST ROUTE (safe)
router.get("/jobs", (req, res) => {
  res.json({
    message: "Company GET jobs route working safely",
  });
});

// ✅ POST JOB
router.post("/jobs", (req, res) => {
  res.json({
    message: "Company POST jobs route working safely",
    body: req.body,
  });
});

module.exports = router;