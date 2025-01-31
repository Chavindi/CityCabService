// package com.cab.backend.service;

// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.cab.backend.model.User;
// import com.cab.backend.repository.UserRepository;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;

//     // Register a new user
//     public String registerUser(User user) {
//         Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
//         if (existingUser.isPresent()) {
//             return "Username already exists!";
//         }
//         userRepository.save(user);
//         return "User registered successfully!";
//     }

//     // Login user by verifying username and password
//     public String loginUser(String username, String password) {
//         User user = userRepository.findByUsernameAndPassword(username, password);
//         if (user != null) {
//             return "Login successful! Welcome " + user.getUsername();
//         }
//         return "Invalid username or password!";
//     }
// }
