package com.collectiveDunes.webSocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

  @MessageMapping("/message")
  @SendTo("/topic/response")
  public String handleMessage(String message){
    System.out.println("Mensaje de TypeScript: " + message);
    return "Mensaje recibido en el servidor: " + message;
  }

  
}
