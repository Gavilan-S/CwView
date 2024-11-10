package com.collectiveDunes.webSocket;

import com.collectiveDunes.mouse.Mouse;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
  private Mouse mouse;

  @MessageMapping("/message")
  @SendTo("/topic/messages")
  public String processMessage(String coordinates) {
    mouse = new Mouse(coordinates.split(",")[0], coordinates.split(",")[1]);
    System.out.println(mouse.getMouseX()+","+mouse.getMouseY()); 
    return (mouse.getMouseX() + "," + mouse.getMouseY());
  }
}
