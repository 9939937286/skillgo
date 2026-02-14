import React, { useEffect } from "react";

function App() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/voice.js";
    script.onload = () => {
      window.startVoiceControl();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>📞 Smart Caller AI (Auto Listening ON)</h1>
      <h3>🎙 बोलिये: राहुल को कॉल करो / कॉल / कट</h3>
    </div>
  );
}

export default App;