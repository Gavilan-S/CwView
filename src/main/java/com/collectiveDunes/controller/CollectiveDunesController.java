package com.collectiveDunes.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CollectiveDunesController {

  @GetMapping("/")
  public String home() {
    return "index";
  }
}
