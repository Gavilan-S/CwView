package com.collectiveDunes.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UsersRepository userRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddUser_UserAlreadyExists() {
        String username = "existingUser";
        String password = "password";
        when(userRepository.findByUsername(username)).thenReturn(new User(username, password));

        ModelAndView result = userController.addUser(username, password);

        assertEquals("redirect:/register", result.getViewName());
        assertEquals("error", result.getModel().get("status"));
        assertEquals("Username already exists", result.getModel().get("message"));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    public void testAddUser_Success() {
        String username = "newUser";
        String password = "password";
        when(userRepository.findByUsername(username)).thenReturn(null);

        ModelAndView result = userController.addUser(username, password);

        assertEquals("redirect:/portal", result.getViewName());
        assertEquals("success", result.getModel().get("status"));
        assertEquals("Registration successful", result.getModel().get("message"));
        verify(userRepository).save(any(User.class));
    }

    @Test
    public void testLoginUser_UserNotFound() {
        String username = "nonexistentUser";
        String password = "password";
        when(userRepository.findByUsername(username)).thenReturn(null);

        ModelAndView result = userController.loginUser(username, password);

        assertEquals("redirect:/", result.getViewName());
        assertEquals("error", result.getModel().get("status"));
        assertEquals("Username does not exist", result.getModel().get("message"));
    }

    @Test
    public void testLoginUser_InvalidPassword() {
        String username = "validUser";
        String password = "wrongPassword";
        User user = new User(username, "correctPassword");
        when(userRepository.findByUsername(username)).thenReturn(user);

        ModelAndView result = userController.loginUser(username, password);

        assertEquals("redirect:/", result.getViewName());
        assertEquals("error", result.getModel().get("status"));
        assertEquals("Invalid password", result.getModel().get("message"));
    }

    @Test
    public void testLoginUser_Success() {
        String username = "validUser";
        String password = "password";
        User user = new User(username, password);
        when(userRepository.findByUsername(username)).thenReturn(user);

        ModelAndView result = userController.loginUser(username, password);

        assertEquals("redirect:/portal", result.getViewName());
        assertEquals("success", result.getModel().get("status"));
        assertEquals("Login successful", result.getModel().get("message"));
    }

    @Test
    public void testGetAllUsers() {
        Iterable<User> users = mock(Iterable.class);
        when(userRepository.findAll()).thenReturn(users);

        Iterable<User> result = userController.getAllUsers();

        assertSame(users, result);
        verify(userRepository).findAll();
    }

    @Test
    public void testGetUserById_UserFound() {
        Long userId = 1L;
        User user = new User("testUser", "password");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        User result = userController.getUserById(userId);

        assertEquals(user, result);
        verify(userRepository).findById(userId);
    }

    @Test
    public void testGetUserById_UserNotFound() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        User result = userController.getUserById(userId);

        assertNull(result);
        verify(userRepository).findById(userId);
    }
}

