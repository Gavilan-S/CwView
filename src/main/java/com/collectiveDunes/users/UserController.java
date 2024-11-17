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
import org.springframework.web.servlet.ModelAndView;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UsersRepository userRepository;

    // Método para registrar usuarios
    @PostMapping("/insert")
    public ModelAndView addUser(@RequestParam String username, @RequestParam String password) {
        Map<String, String> response = new HashMap<>();

        // Verifica si el usuario ya existe
        if (userRepository.findByUsername(username) != null) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return new ModelAndView("redirect:/register", response);
        }

        // Si no existe, crea un nuevo usuario
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);

        response.put("status", "success");
        response.put("message", "Registration successful");
        return new ModelAndView("redirect:/portal", response);
    }

    // Método para iniciar sesión
    @PostMapping("/login")
    public ModelAndView loginUser(@RequestParam String username, @RequestParam String password) {
        Map<String, String> response = new HashMap<>();
        User user = userRepository.findByUsername(username);

        if (user == null) {
            response.put("status", "error");
            response.put("message", "Username does not exist");
            return new ModelAndView("redirect:/login", response);
        }

        // Verificación de contraseña
        if (!user.getPassword().equals(password)) {
            response.put("status", "error");
            response.put("message", "Invalid password");
            return new ModelAndView("redirect:/login", response);
        }

        // Si la autenticación es exitosa
        response.put("status", "success");
        response.put("message", "Login successful");
        return new ModelAndView("redirect:/portal", response);
    }

    // Método para obtener todos los usuarios (opcional)
    @GetMapping("/findAll")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtener usuario por ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
