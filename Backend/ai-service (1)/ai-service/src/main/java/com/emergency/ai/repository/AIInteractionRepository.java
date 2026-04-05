package com.emergency.ai.repository;

import com.emergency.ai.model.AIInteractionLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AIInteractionRepository extends MongoRepository<AIInteractionLog, String> {
}
