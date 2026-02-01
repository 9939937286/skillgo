const express = require("express");
const router = express.Router();

const {
  createCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
} = require("../controllers/companyController");

const auth = require("../middleware/authMiddleware");

router.post("/profile", auth, createCompanyProfile);
router.get("/profile", auth, getCompanyProfile);
router.put("/profile", auth, updateCompanyProfile);

module.exports = router;