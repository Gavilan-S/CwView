package com.collectiveDunes.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import jakarta.annotation.PostConstruct;

@Controller
@RequestMapping("/users")
public class UserController {

  @Autowired
  private UsersRepository userRepository;

  @PostMapping("/insert")
  public ModelAndView addUser(@RequestParam String username, @RequestParam String password) {
    Map<String, String> response = new HashMap<>();

    if (userRepository.findByUsername(username) != null) {
      response.put("status", "error");
      response.put("message", "Username already exists");
      return new ModelAndView("redirect:/register", response);
    }

    User user = new User();
    user.setUsername(username);
    user.setPassword(password);
    userRepository.save(user);

    response.put("status", "success");
    response.put("message", "Registration successful");
    return new ModelAndView("redirect:/portal", response);
  }

  @PostConstruct
  public void init() {
    User user = new User();
    user.setUsername("userTest");
    user.setPassword("123");
    userRepository.save(user);
  }

  @PostMapping("/login")
  public ModelAndView loginUser(@RequestParam String username, @RequestParam String password) {
    Map<String, String> response = new HashMap<>();
    User user = userRepository.findByUsername(username);

    if (user == null) {
      response.put("status", "error");
      response.put("message", "Username does not exist");
      return new ModelAndView("redirect:/login", response);
    }

    if (!user.getPassword().equals(password)) {
      response.put("status", "error");
      response.put("message", "Invalid password");
      return new ModelAndView("redirect:/login", response);
    }

    response.put("status", "success");
    response.put("message", "Login successful");
    return new ModelAndView("redirect:/portal", response);
  }

  @GetMapping("/findAll")
  public Iterable<User> getAllUsers() {
    return userRepository.findAll();
  }

  @GetMapping("/{id}")
  public User getUserById(@PathVariable Long id) {
    return userRepository.findById(id).orElse(null);
  }
}
