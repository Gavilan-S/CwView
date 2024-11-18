package com.collectiveDunes.pageController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CollectiveDunesPageController {

  @RequestMapping("/")
  public String showPage() { return "login"; }

  @RequestMapping("/game")
  public String showIndex(){ return "game"; }

  @RequestMapping("/portal")
  public String showPortal(){ return "portal"; }

  @RequestMapping("/register")
  public String showRegister(){ return "register"; }
}
