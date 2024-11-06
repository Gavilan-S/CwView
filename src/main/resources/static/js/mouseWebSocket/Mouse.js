let stompClient = null;

// set up connection
export function connectionWebSocket() {
  const socket = new SockJS('/WebSocket');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, function(frame) {
    console.log('State: ' + frame);

    // subscribe to listen response
    stompClient.subscribe('/topic/messages', function(response) {
      console.log('Got the answer:', response.body);
    });
  });
}

// sendCoordinates WebSocket
export function sendCoordinates(event) {
  // get mouse coordinates
  const x = event.offsetX;
  const y = event.offsetY;

  if (stompClient && stompClient.connected) {
    const mensaje = {
      contenido: `X=${x}, Y=${y}`
    };
    stompClient.send("/coordinates/message", {}, JSON.stringify(mensaje));
  }
}

