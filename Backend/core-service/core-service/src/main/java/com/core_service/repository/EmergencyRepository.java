package com.core_service.repository;

import com.core_service.entity.Emergency;
import com.core_service.enums.EmergencyStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyRepository extends MongoRepository<Emergency, String> {
    List<Emergency> findByStatus(EmergencyStatus status);
    List<Emergency> findByUserId(String userId);
}