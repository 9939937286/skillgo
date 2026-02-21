<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>SmartCaller Omnipresence</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div id="callerScreen" class="idle">

  <div id="hologram"></div>

  <h2 id="statusText">SmartCaller Ready...</h2>

  <div class="controls">
    <button onclick="acceptCall()">Accept</button>
    <button onclick="rejectCall()">Reject</button>
    <button onclick="outgoingCall()">Outgoing</button>
  </div>

</div>

<script src="caller.js"></script>
</body>
</html>