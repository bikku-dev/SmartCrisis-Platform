package com.core_service.service.impl;

import com.core_service.entity.Volunteer;
import com.core_service.repository.VolunteerRepository;
import com.core_service.service.VolunteerService;
import com.core_service.util.DistanceUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VolunteerServiceImpl implements VolunteerService {

    private final VolunteerRepository repo;

    @Override
    public Volunteer save(Volunteer v) {
        v.setId(UUID.randomUUID().toString());
        return repo.save(v);
    }

    @Override
    public List<Volunteer> getAll() {
        return repo.findAll();
    }

    @Override
    public Volunteer findAvailable(double lat, double lon) {
        return repo.findAll().stream()
                .filter(Volunteer::isAvailable)
                .min(Comparator.comparing(v ->
                        DistanceUtil.calculate(lat, lon,
                                v.getLatitude(), v.getLongitude())))
                .orElseThrow(() -> new RuntimeException("No volunteer found"));
    }
}