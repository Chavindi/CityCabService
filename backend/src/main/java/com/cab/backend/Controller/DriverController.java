package com.cab.backend.Controller;

import java.util.List;
import java.util.Map;

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
import com.cab.backend.repository.DriverRepository;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    private final DriverRepository driverRepository;

    public DriverController(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
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

    // Add a new driver
    @PostMapping
    public ResponseEntity<Driver> addDriver(@RequestBody Driver driver) {
        Driver savedDriver = driverRepository.save(driver);
        return ResponseEntity.ok(savedDriver);
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

    // Delete driver
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable String id) {
        if (driverRepository.existsById(id)) {
            driverRepository.deleteById(id); // Directly using deleteById method
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404 Not Found
        }
    }


    @PutMapping("/{id}/assign-car")
public ResponseEntity<Driver> assignCarToDriver(@PathVariable String id, @RequestBody Map<String, String> request) {
    String carNumber = request.get("carNumber");

    return driverRepository.findById(id).map(driver -> {
        // Check if the car is already assigned to another driver
        if (driverRepository.existsByAssignedCar(carNumber)) {
            // Return ResponseEntity with a null body but properly typed as Driver
            return ResponseEntity.badRequest().body((Driver) null); // Car is already assigned
        }

        driver.setAssignedCar(carNumber);
        Driver updatedDriver = driverRepository.save(driver);
        return ResponseEntity.ok(updatedDriver); // Return updated driver
    }).orElse(ResponseEntity.notFound().build()); // If driver not found, return 404
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
