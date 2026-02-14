const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.continuous = true;

recognition.onresult = function (event) {

  const text =
    event.results[event.results.length - 1][0].transcript.trim();

  console.log("🎤 Voice:", text);

  const lower = text.toLowerCase();

  // ✅ ACCEPT COMMANDS (बहुत सारे शब्द add किये)
  if (
    lower.includes("उठाओ") ||
    lower.includes("कॉल उठाओ") ||
    lower.includes("receive") ||
    lower.includes("accept")
  ) {
    document.querySelector(".acceptEnergy").click();
  }

  // ❌ REJECT COMMANDS
  if (
    lower.includes("कट") ||
    lower.includes("काटो") ||
    lower.includes("reject") ||
    lower.includes("dismiss")
  ) {
    document.querySelector(".dismissSignal").click();
  }
};