import React, { useState, useEffect } from "react";
import { startVoiceControl } from "./voiceControl";

function App() {
  const [lang, setLang] = useState("hi-IN");

  // 📞 Accept Call Function
  function acceptCall() {
    alert("📞 Call Accepted by Voice AI");
  }

  // 🎤 Start Voice Engine
  useEffect(() => {
    startVoiceControl(lang, acceptCall);
  }, [lang]);

  return (
    <div style={{ padding: 40 }}>
      <h2>🎤 Smart Caller Voice Test</h2>

      <p>Select Language:</p>

      <select onChange={(e) => setLang(e.target.value)}>
        <option value="hi-IN">Hindi</option>
        <option value="en-US">English</option>
        <option value="ur-PK">Urdu</option>
      </select>

      <h3>🎙️ Bolo: "call uthao"</h3>
    </div>
  );
}

export default App;