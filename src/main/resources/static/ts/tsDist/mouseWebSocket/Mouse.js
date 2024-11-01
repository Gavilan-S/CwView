import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// init webSocket and subscribe
export function initWebSocket() {
    var socket = new SockJS('/ws');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        // subscribe to topic
        stompClient.subscribe('/topic/mouse-coordinates', function (message) {
            var coords = JSON.parse(message.body);
            console.log('Mouse Coordinates:', coords);
        });
    });
    // bia clicks
    document.addEventListener('click', function (event) {
        var coords = {
            x: event.clientX,
            y: event.clientY,
        };
        stompClient.send('/app/mouse-coordinates', {}, JSON.stringify(coords));
    });
}
