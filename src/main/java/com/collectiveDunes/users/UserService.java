
package com.collectiveDunes.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UsersRepository userRepository;

  // registrar usuario
  public boolean registerUser(User user) {
    if (userRepository.existsByUsername(user.getUsername())) {
      return false;
    }
    userRepository.save(user);
    return true; // exitoso
  }

  //  login
  public User loginUser(String username, String password) {
    User user = userRepository.findByUsername(username);
    if (user != null && user.getPassword().equals(password)) {
      return user; //exitoso
    }
    return null; 
  }
}

