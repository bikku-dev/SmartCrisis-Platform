package com.core_service.repository;

import com.core_service.entity.Hospital;
import com.mongodb.client.model.geojson.Point;
import org.springframework.data.geo.Distance;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HospitalRepository extends MongoRepository<Hospital, String> {

    List<Hospital> findByLocationNear(Point point, Distance distance);
}