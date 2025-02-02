package com.cab.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cab.backend.model.Driver;

public interface DriverRepository extends MongoRepository<Driver, String> {
}
