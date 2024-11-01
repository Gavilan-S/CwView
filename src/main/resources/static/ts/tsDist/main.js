import { initWebSocket } from "./mouseWebSocket/Mouse.js";
import { sandboxCreate } from "./sandbox/SandboxFunctions.js";
initWebSocket();
var canvas = document.getElementById("sandboxCanvas");
sandboxCreate(canvas);
