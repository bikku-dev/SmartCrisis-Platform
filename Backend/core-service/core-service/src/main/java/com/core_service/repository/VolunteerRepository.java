package com.core_service.repository;

import com.core_service.entity.Volunteer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VolunteerRepository extends MongoRepository<Volunteer, String> {
}