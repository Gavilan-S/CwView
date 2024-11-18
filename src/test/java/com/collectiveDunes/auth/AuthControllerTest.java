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
        assertEquals("redirect:/register", result);
    }

    @Test
    public void testShowLoginPage() {
        String result = authController.showLoginPage();
        assertEquals("redirect:/", result);
    }

    @Test
    public void testRegisterUser_Success() {
        User user = new User("newUser", "password");
        when(userService.registerUser(user)).thenReturn(true);

        String result = authController.registerUser(user);
        assertEquals("redirect:/portal", result);

        verify(userService).registerUser(user);
    }

    @Test
    public void testRegisterUser_Failure() {
        User user = new User("existingUser", "password");
        when(userService.registerUser(user)).thenReturn(false);

        String result = authController.registerUser(user);
        assertEquals("redirect:/register", result);

        verify(userService).registerUser(user);
    }

    @Test
    public void testLoginUser_Success() {
        User user = new User("validUser", "password");
        when(userService.loginUser("validUser", "password")).thenReturn(user);

        String result = authController.loginUser("validUser", "password");
        assertEquals("redirect:/portal", result);

        verify(userService).loginUser("validUser", "password");
    }

    @Test
    public void testLoginUser_Failure() {
        when(userService.loginUser("invalidUser", "wrongPassword")).thenReturn(null);

        String result = authController.loginUser("invalidUser", "wrongPassword");
        assertEquals("redirect:/", result);

        verify(userService).loginUser("invalidUser", "wrongPassword");
    }
}

