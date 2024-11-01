import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// init webSocket and subscribe
export function initWebSocket() {
    const socket = new SockJS('/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        
        // subscribe to topic
        stompClient.subscribe('/topic/mouse-coordinates', (message) => {
            const coords = JSON.parse(message.body);
            console.log('Mouse Coordinates:', coords);
        });
    });

    // bia clicks
    document.addEventListener('click', (event) => {
        const coords = {
            x: event.clientX,
            y: event.clientY,
        };
        stompClient.send('/app/mouse-coordinates', {}, JSON.stringify(coords));
    });
}

