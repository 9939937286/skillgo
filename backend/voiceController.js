const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = false;

// 🎤 Start Voice Control with Manual Language
export function startVoiceControl(language, onAcceptCall) {
  recognition.lang = language; // 🔥 manual language set

  recognition.start();
  console.log("🎤 Voice Listening Started:", language);

  recognition.onresult = function (event) {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript.toLowerCase();

    console.log("Voice:", text);

    if (
      text.includes("call uthao") ||
      text.includes("accept") ||
      text.includes("receive")
    ) {
      onAcceptCall();
    }
  };
}