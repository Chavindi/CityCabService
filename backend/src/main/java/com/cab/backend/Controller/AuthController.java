package com.cab.backend.Controller;

import com.cab.backend.model.User;
import com.cab.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {
        User user = userRepository.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        
        if (user == null) {
            return "Invalid username or password!";
        } else {
            return "Login successful! Welcome " + user.getUsername();
        }
    }
}
