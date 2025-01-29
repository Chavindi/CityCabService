package com.cab.backend.repository;

import com.cab.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);
}
