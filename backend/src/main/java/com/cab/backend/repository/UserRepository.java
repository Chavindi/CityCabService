package com.cab.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cab.backend.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email); // For both Admin and Customer login
    boolean existsByEmail(String email); // Check if email already exists

    User findByRegistrationNumber(String registrationNumber);
}
