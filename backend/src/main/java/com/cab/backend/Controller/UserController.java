package com.cab.backend.Controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cab.backend.model.User;
import com.cab.backend.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new customer (Create)
    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>("Email already exists!", HttpStatus.BAD_REQUEST);
        }

        // Generate a unique customer registration number (e.g., "CUST-123456")
        String registrationNumber = "CUST-" + (100000 + new Random().nextInt(900000));
        user.setRegistrationNumber(registrationNumber);

        // Set customer-specific details
        user.setRole("CUSTOMER");
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());

        // Save customer in the database
        userRepository.save(user);

        return new ResponseEntity<>("Customer registered successfully with Registration Number: " + registrationNumber, HttpStatus.CREATED);
    }

    // Get all users (Read)
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get user by ID (Read)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update user by ID (Update)
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        Optional<User> existingUser = userRepository.findById(id);

        if (!existingUser.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User updatedUser = existingUser.get();
        updatedUser.setName(user.getName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setContactNumber(user.getContactNumber());
        updatedUser.setAddress(user.getAddress());
        updatedUser.setNic(user.getNic());
        updatedUser.setRole(user.getRole());
        updatedUser.setUpdatedAt(new Date());

        // Save the updated user in the database
        userRepository.save(updatedUser);

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // Delete user by ID (Delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);

        if (!user.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Delete the user from the database
        userRepository.delete(user.get());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
