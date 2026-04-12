package com.core_service.repository;

import com.core_service.entity.BloodStock;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodStockRepository extends MongoRepository<BloodStock, String> {
    List<BloodStock> findByBloodGroup(String bloodGroup);
}