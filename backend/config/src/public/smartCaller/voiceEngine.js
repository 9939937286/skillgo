// ===============================
// 🎤 ULTRA VOICE COMMAND ENGINE
// ===============================

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-IN";
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = function (event) {
  const transcript =
    event.results[event.results.length - 1][0].transcript.toLowerCase();

  console.log("🎤 Voice Command:", transcript);

  // ===== COMMANDS =====
  if (transcript.includes("receive")) {
    receiveCall();
  }

  if (transcript.includes("cut") || transcript.includes("end")) {
    endCall();
  }

  if (transcript.includes("call")) {
    startCalling();
  }
};

// Start listening automatically
recognition.start();