// ===================================
// 📞 SKILLGO SMART CALL STATE ENGINE
// ===================================

const statusText = document.querySelector(".status");

function startCalling() {
  console.log("📞 Calling...");
  statusText.innerText = "Calling...";
}

function receiveCall() {
  console.log("✅ Connected");
  statusText.innerText = "Connected";
}

function endCall() {
  console.log("❌ Call Ended");
  statusText.innerText = "Call Ended";
}