const mongoose = require("mongoose");

const CompanyProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      unique: true
    },
    companyName: String,
    ownerName: String,
    phone: String,
    address: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyProfile", CompanyProfileSchema);