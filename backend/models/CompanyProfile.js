const mongoose = require("mongoose");

const companyProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: String,
    gstNumber: String,
    address: String,
    contactNumber: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyProfile", companyProfileSchema);