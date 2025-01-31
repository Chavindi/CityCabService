package com.cab.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cab.backend.model.Car;

public interface CarRepository extends MongoRepository<Car, String> {
    List<Car> findByDriverId(String driverId);
}
