const express = require("express");
const auth = require("../middleware/authMiddleware");
const CompanyProfile = require("../models/CompanyProfile");

const router = express.Router();

// CREATE PROFILE
router.post("/profile", auth, async (req, res) => {
  const exists = await CompanyProfile.findOne({ user: req.user.id });
  if (exists) return res.status(400).json({ message: "Profile already exists" });

  const profile = await CompanyProfile.create({
    user: req.user.id,
    ...req.body
  });

  res.status(201).json({ message: "Company profile created", profile });
});

// GET PROFILE
router.get("/profile", auth, async (req, res) => {
  const profile = await CompanyProfile.findOne({ user: req.user.id });
  if (!profile)
    return res.status(404).json({ message: "Company profile not found" });

  res.json(profile);
});

// UPDATE PROFILE
router.put("/profile", auth, async (req, res) => {
  const profile = await CompanyProfile.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    { new: true }
  );

  if (!profile)
    return res.status(404).json({ message: "Company profile not found" });

  res.json({ message: "Company profile updated", profile });
});

module.exports = router;