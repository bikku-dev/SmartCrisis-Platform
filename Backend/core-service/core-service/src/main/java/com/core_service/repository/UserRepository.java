package com.core_service.repository;

import com.core_service.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByKeycloakId(String keycloakId);
}