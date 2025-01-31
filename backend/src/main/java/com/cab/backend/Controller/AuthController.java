package com.cab.backend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cab.backend.model.User;
import com.cab.backend.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestParam String username, @RequestParam String password) {
        User user = userRepository.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return new ResponseEntity<>(new Response("Login successful!", user.getRole()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response("Invalid username or password", null), HttpStatus.UNAUTHORIZED);
        }
    }

    // Response DTO class to return the message and role
    public static class Response {
        private String message;
        private String role;

        public Response(String message, String role) {
            this.message = message;
            this.role = role;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }

    // Register endpoint (kept as it is)
    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password) {
        // Registration logic, save user to DB (simplified)
        return "User registered successfully!";
    }
}
