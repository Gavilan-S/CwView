import { simulateClick } from "../sandbox/SandboxFunctions.js";

let stompClient = null;

export function connectionWebSocket() {
  const socket = new SockJS('/WebSocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function(frame) {
    console.log('State: ' + frame);
    stompClient.subscribe('/topic/messages', function(response) {
      try {
        simulateClick(response.body);
        console.log('Simulated click at:', response.body);
      } catch (error) {
        console.error('Error simulating click:', error);
      }
    });
  });
}

export function sendCoordinates(event) {
  if (stompClient && stompClient.connected) {
    const rect = event.target.getBoundingClientRect();
    // Calcular las coordenadas relativas al canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const mensaje = `${x},${y}`;
    stompClient.send("/coordinates/message", {}, mensaje);
  }
}
