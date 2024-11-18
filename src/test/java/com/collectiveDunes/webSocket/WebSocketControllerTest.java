package com.collectiveDunes.webSocket;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

import org.junit.jupiter.api.Test;

public class WebSocketControllerTest {
  WebSocketController webSocketController = new WebSocketController();

  @Test // Valid
  public void createMouseTest() {
    // Given
    String coordinatesTest = "100,100";

    // When
    String resultTest = webSocketController.processMessage(coordinatesTest);

    // Then
    assertEquals("100,100", resultTest);
  }

  @Test // Valid
  public void createMouseTestNoValid() {
    // Given
    String coordinatesTest = "wrongCoordinatesTest";

    // When + Then
    assertThrows(IllegalArgumentException.class, () -> {
      webSocketController.processMessage(coordinatesTest); 
    });
  } 
}
