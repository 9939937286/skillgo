// 🎤 Smart Caller Manual Language Voice Control

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;

export function startVoiceControl(language, onAcceptCall) {
  recognition.lang = language;

  try {
    recognition.start();
    console.log("🎤 Voice Listening Started:", language);
  } catch (e) {
    console.log("Already running...");
  }

  recognition.onresult = function (event) {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript.toLowerCase();

    console.log("🧠 Voice:", text);

    // ✅ ACCEPT COMMAND
    if (
      text.includes("call uthao") ||
      text.includes("accept") ||
      text.includes("receive")
    ) {
      console.log("📞 Auto Accept Triggered");
      onAcceptCall();
    }
  };

  recognition.onerror = function (event) {
    console.log("❌ Voice Error:", event.error);
  };
}