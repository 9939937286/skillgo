const express = require("express");
const router = express.Router();

// temporary in-memory chat
let chats = [];

// ================= SEND MESSAGE =================
router.post("/send", (req, res) => {
  const { jobId, message } = req.body;

  if (!jobId || !message) {
    return res.status(400).json({ message: "jobId and message required" });
  }

  const chat = {
    id: chats.length + 1,
    jobId,
    message,
    createdAt: new Date()
  };

  chats.push(chat);

  res.json({
    success: true,
    chat
  });
});

// ================= GET CHAT BY JOB =================
router.get("/:jobId", (req, res) => {
  const jobId = parseInt(req.params.jobId);

  const jobChats = chats.filter(c => c.jobId === jobId);

  res.json({
    success: true,
    chats: jobChats
  });
});

module.exports = router;