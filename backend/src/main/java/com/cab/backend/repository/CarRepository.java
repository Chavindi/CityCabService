package com.cab.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cab.backend.model.Car;

public interface CarRepository extends MongoRepository<Car, String> {
    
}
