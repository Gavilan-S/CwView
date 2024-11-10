import { connectionWebSocket, sendCoordinates } from "./webSocket/WebSocketMouse.js";
import { sandboxCreate } from "./sandbox/SandboxFunctions.js";

var canvas = document.getElementById("sandboxCanvas");
sandboxCreate(canvas);

window.onload = function() {
  connectionWebSocket();
  canvas.addEventListener("mousedown", sendCoordinates);
};

