package com.core_service.service;

import com.core_service.entity.Hospital;

import java.util.List;

public interface HospitalService {

    Hospital save(Hospital hospital);

    List<Hospital> getAll();

    Hospital findNearest(double lat, double lon);

    List<Hospital> getNearby(double lat, double lon); // 🔥 ADD
}