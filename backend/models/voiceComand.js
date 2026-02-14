const mongoose = require("mongoose");

const voiceSchema = new mongoose.Schema({
  command: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VoiceCommand", voiceSchema);