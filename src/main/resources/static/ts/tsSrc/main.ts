import { sandboxCreate } from "./sandbox/SandboxFunctions.js";

const canvas = document.getElementById("sandboxCanvas") as HTMLCanvasElement;
sandboxCreate(canvas);
