package com.cab.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;  // Ensure this is imported

import com.cab.backend.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {
  
    // Custom query to find bookings by customerId
    List<Booking> findByRegistrationNumber(String registrationNumber);
    List<Booking> findByDriverEmail(String email); 
}
