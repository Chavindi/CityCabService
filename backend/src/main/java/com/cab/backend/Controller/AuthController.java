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
    public ResponseEntity<Response> login(@RequestParam String email, @RequestParam String password) {
        User user = userRepository.findByEmail(email); // Find user by email

        if (user != null && user.getPassword().equals(password)) {
            // Return the email with login success
            return new ResponseEntity<>(new Response("Login successful!", user.getRole(), user.getName(), user.getRegistrationNumber(), email), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response("Invalid credentials", null, null, null, null), HttpStatus.UNAUTHORIZED);
        }
    }

    // Response DTO class to return the message and role, including the email
    public static class Response {
        private String message;
        private String role;
        private String name;
        private String registrationNumber;
        private String email;

        public Response(String message, String role , String name , String registrationNumber, String email) {
            this.message = message;
            this.role = role;
            this.name = name;
            this.registrationNumber = registrationNumber;
            this.email = email;
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

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getRegistrationNumber() {
            return registrationNumber;
        }

        public void setRegistrationNumber(String registrationNumber) {
            this.registrationNumber = registrationNumber;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}
