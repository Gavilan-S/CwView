package com.collectiveDunes.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UsersRepository userRepository;

    @PostMapping
    public String addUser(@RequestParam String username, @RequestParam String password) {
        if (userRepository.findByUsername(username) != null) {
            return "Error: Username already exists";
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password); 
        userRepository.save(user);
        return "User added successfully";
    }

    
    @GetMapping
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
