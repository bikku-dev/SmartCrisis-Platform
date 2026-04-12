package com.core_service.service.impl;

import com.core_service.entity.Hospital;
import com.core_service.repository.HospitalRepository;
import com.core_service.service.HospitalService;
import com.core_service.util.DistanceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService {

    private final HospitalRepository repo;



    @Override
    public Hospital save(Hospital hospital) {
        hospital.setId(UUID.randomUUID().toString());
        return repo.save(hospital);
    }

    @Override
    public List<Hospital> getAll() {
        return repo.findAll();
    }

    @Override
    public Hospital findNearest(double lat, double lon) {

        return repo.findAll().stream()
                .min(Comparator.comparing(h -> {

                    double hLat = h.getLocation()[1];
                    double hLng = h.getLocation()[0];

                    return DistanceUtil.calculate(lat, lon, hLat, hLng);
                }))
                .orElseThrow(() -> new RuntimeException("No hospital found"));
    }

    @Override
    public List<Hospital> getNearby(double lat, double lon) {

        return repo.findAll().stream()
                .sorted(Comparator.comparing(h -> {

                    double hLat = h.getLocation()[1];
                    double hLng = h.getLocation()[0];

                    return DistanceUtil.calculate(lat, lon, hLat, hLng);
                }))
                .limit(5)
                .toList();
    }
}