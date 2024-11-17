package com.collectiveDunes.users;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UsersRepository userRepository;

    @PostMapping("/insert")
    public String addUser(@RequestParam String username, @RequestParam String password) {
        if (userRepository.findByUsername(username) != null) {
            return "Error: Username already exists";
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); 
        userRepository.save(user);
        return "redirect:/portal";
    }

    @PostMapping("/login")
public ResponseEntity<Map<String, String>> loginUser(@RequestParam String username, @RequestParam String password) {
    User user = userRepository.findByUsername(username);

    Map<String, String> response = new HashMap<>();
    if (user == null) {
        response.put("status", "error");
        response.put("message", "Username does not exist");
        return ResponseEntity.badRequest().body(response);
    }

    if (!user.getPassword().equals(password)) {  // Verificación de contraseña
        response.put("status", "error");
        response.put("message", "Invalid password");
        return ResponseEntity.badRequest().body(response);
    }

    response.put("status", "success");
    response.put("message", "Login successful");
    return ResponseEntity.ok(response);
}


    @GetMapping("/findAll")
    public Iterable<User> getAllUsers() { return userRepository.findAll(); }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) { return userRepository.findById(id).orElse(null); }
}
