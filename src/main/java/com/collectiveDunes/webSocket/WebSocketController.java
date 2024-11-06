package com.collectiveDunes.webSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

  @MessageMapping("/message")
  @SendTo("/topic/messages")
  public String processMessage(String message) {
    System.out.println("Mensaje recibido en Java: " + message);
    return "Mensaje procesado y recibido correctamente: " + message;
  }
}
