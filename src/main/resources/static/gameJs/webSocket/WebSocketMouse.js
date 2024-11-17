import { simulateClick } from "../sandbox/Sandbox.js";

let stompClient = null;
let lastSentTimestamp = 0;
const THROTTLE_DELAY = 16; // something like 60 fps

export function connectionWebSocket() {
  const socket = new SockJS('/WebSocket');
  stompClient = Stomp.over(socket);

  // stompClient.debug = null;

  stompClient.connect({}, function(frame) {
    console.log('State: ' + frame);
    stompClient.subscribe('/topic/messages', function(response) {
      try {
        simulateClick(response.body);
      } catch (error) {
        console.error('Error simulating draw:', error);
      }
    });
  });
}

export function sendCoordinates(event) {
  if (!stompClient?.connected) return;

  const currentTime = Date.now();
  if (currentTime - lastSentTimestamp < THROTTLE_DELAY) return;

  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  stompClient.send("/coordinates/message", {}, `${x},${y}`);
  lastSentTimestamp = currentTime;
}

window.sendCoordinates = sendCoordinates;

