package com.cab.backend.Controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
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

import com.cab.backend.model.Driver;
import com.cab.backend.model.User;
import com.cab.backend.repository.DriverRepository;
import com.cab.backend.repository.UserRepository;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository;

    public DriverController(DriverRepository driverRepository, UserRepository userRepository) {
        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
    }

    // Get all drivers
    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Get driver by ID
    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriverById(@PathVariable String id) {
        return driverRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add a new driver and create a user account for the driver
    @PostMapping("/add")
public ResponseEntity<?> addDriver(@RequestBody Map<String, Object> request) {
    // Extract driver details from the request
    String firstName = (String) request.get("firstName");
    String lastName = (String) request.get("lastName");
    String email = (String) request.get("email");
    String telephone1 = (String) request.get("telephone1");
    String telephone2 = (String) request.get("telephone2");
    String nic = (String) request.get("nic");
    String assignedCar = (String) request.get("assignedCar");
    String password = (String) request.get("password"); // Extract password directly

    // Check if email is already used
    if (userRepository.existsByEmail(email)) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Error: Email is already registered!");
    }

    // Save the driver entity
    Driver driver = new Driver(firstName, lastName, email, telephone1, telephone2, nic, assignedCar);
    Driver savedDriver = driverRepository.save(driver);

    
    // Create a user entry for the driver
    User user = new User();
    String registrationNumber = "CUST-" + (100000 + new Random().nextInt(900000));
    user.setRegistrationNumber(registrationNumber);
    user.setName(firstName + " " + lastName); // Assuming full name should be set
    user.setEmail(email);
    user.setPassword(password); // Store the password directly without hashing
    user.setRole("DRIVER");
    user.setCreatedAt(new Date());
    user.setUpdatedAt(new Date());

    // Save user in the database
    userRepository.save(user);

    return ResponseEntity.ok("Driver added successfully and user account created.");
}

    // Update driver details
    @PutMapping("/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable String id, @RequestBody Driver driverDetails) {
        return driverRepository.findById(id).map(driver -> {
            driver.setFirstName(driverDetails.getFirstName());
            driver.setLastName(driverDetails.getLastName());
            driver.setEmail(driverDetails.getEmail());
            driver.setTelephone1(driverDetails.getTelephone1());
            driver.setTelephone2(driverDetails.getTelephone2());
            driver.setNic(driverDetails.getNic());
            Driver updatedDriver = driverRepository.save(driver);
            return ResponseEntity.ok(updatedDriver);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Delete driver and associated user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable String id) {
        Optional<Driver> driver = driverRepository.findById(id);
        if (driver.isPresent()) {
            // Delete user associated with the driver
            userRepository.deleteByEmail(driver.get().getEmail());
            driverRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404 Not Found
        }
    }

    // Assign a car to a driver
    @PutMapping("/{id}/assign-car")
    public ResponseEntity<?> assignCarToDriver(@PathVariable String id, @RequestBody Map<String, String> request) {
        String carNumber = request.get("carNumber");

        return driverRepository.findById(id).map(driver -> {
            // Check if the car is already assigned to another driver
            if (driverRepository.existsByAssignedCar(carNumber)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error: Car is already assigned to another driver!");
            }

            driver.setAssignedCar(carNumber);
            Driver updatedDriver = driverRepository.save(driver);
            return ResponseEntity.ok(updatedDriver);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Remove assigned car
    @PutMapping("/{id}/remove-car")
    public ResponseEntity<Driver> removeCarFromDriver(@PathVariable String id) {
        return driverRepository.findById(id).map(driver -> {
            driver.setAssignedCar(null); // Reset to null
            Driver updatedDriver = driverRepository.save(driver);
            return ResponseEntity.ok(updatedDriver);
        }).orElse(ResponseEntity.notFound().build());
    }
}
