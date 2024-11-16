package com.collectiveDunes.pageController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CollectiveDunesPageController {

  @RequestMapping("/")
  public String showPage() {
    return "portal";
  }
  @RequestMapping("/game")
  public String showIndex(){
    return "game";
  }
  @RequestMapping("/login")
  public String showLogin(){
    return "login";
  }
  @RequestMapping("/register")
  public String showRegister(){
    return "register";
  }
}
