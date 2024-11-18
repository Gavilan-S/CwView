package com.collectiveDunes.auth;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.collectiveDunes.user.User;
import com.collectiveDunes.user.UserService;

public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private UserService userService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testShowRegisterPage() {
        String result = authController.showRegisterPage();
        assertEquals("register", result);
    }

    @Test
    public void testShowLoginPage() {
        String result = authController.showLoginPage();
        assertEquals("login", result);
    }

    @Test
    public void testRegisterUser_Success() {
        User user = new User();
        user.setUsername("newUser");
        user.setPassword("password");
        when(userService.registerUser(user)).thenReturn(true);

        String result = authController.registerUser(user);
        assertEquals("redirect:/portal", result);

        verify(userService).registerUser(user);
    }

    @Test
    public void testRegisterUser_Failure() {
        User user = new User();
        user.setUsername("existingUser");
        user.setPassword("password");
        when(userService.registerUser(user)).thenReturn(false);

        String result = authController.registerUser(user);
        assertEquals("register", result);

        verify(userService).registerUser(user);
    }

    @Test
    public void testLoginUser_Success() {
        User user = new User();
        user.setUsername("validUser");
        user.setPassword("password");
        when(userService.loginUser("validUser", "password")).thenReturn(user);

        String result = authController.loginUser("validUser", "password");
        assertEquals("redirect:/portal", result);

        verify(userService).loginUser("validUser", "password");
    }

    @Test
    public void testLoginUser_Failure() {
        when(userService.loginUser("invalidUser", "wrongPassword")).thenReturn(null);

        String result = authController.loginUser("invalidUser", "wrongPassword");
        assertEquals("login", result);

        verify(userService).loginUser("invalidUser", "wrongPassword");
    }
}

