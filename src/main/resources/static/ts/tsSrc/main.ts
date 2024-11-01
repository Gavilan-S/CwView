import { initWebSocket } from "./mouseWebSocket/Mouse.js";
import { sandboxCreate } from "./sandbox/SandboxFunctions.js";

initWebSocket();

const canvas = document.getElementById("sandboxCanvas") as HTMLCanvasElement;
sandboxCreate(canvas);
