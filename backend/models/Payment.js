const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true
    },
    amount: Number,
    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);