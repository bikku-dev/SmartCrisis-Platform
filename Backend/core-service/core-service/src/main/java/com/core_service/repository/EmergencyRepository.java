package com.core_service.repository;

import com.core_service.entity.Emergency;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmergencyRepository extends MongoRepository<Emergency, String> {
}