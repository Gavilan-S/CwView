package com.collectiveDunes.webSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/mouse")
    public void handleMouseCoordinates(Mouse coordinates) {
        messagingTemplate.convertAndSend("/topic/coordinates", coordinates);
    }
}
