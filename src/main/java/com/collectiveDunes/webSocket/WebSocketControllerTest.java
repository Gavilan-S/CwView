package com.collectiveDunes.webSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketControllerTest {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketControllerTest(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // look for it on documentatis
    @MessageMapping("/mouse")
    public void handleMouseCoordinates(Mouse coordinates) {
        messagingTemplate.convertAndSend("/topic/coordinates", coordinates);
    }
}
