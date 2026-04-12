package com.core_service.service.impl;

import com.core_service.dto.EmergencyRequest;
import com.core_service.entity.Emergency;
import com.core_service.enums.EmergencyStatus;
import com.core_service.enums.EmergencyType;
import com.core_service.repository.EmergencyRepository;
import com.core_service.service.EmergencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmergencyServiceImpl implements EmergencyService {

    private final EmergencyRepository repo;

    @Override
    public Emergency createEmergency(String userId, EmergencyRequest req) {

        Emergency e = Emergency.builder()
                .userId(userId)
                .description(req.getDescription())
                .severity(req.getSeverity())
                .latitude(req.getLatitude())
                .longitude(req.getLongitude())
                .address(req.getAddress())
                .status(EmergencyStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .build();

        return repo.save(e);
    }

    @Override
    public List<Emergency> getActiveEmergencies() {
        return repo.findByStatus(EmergencyStatus.ACTIVE);
    }

    @Override
    public List<Emergency> getUserHistory(String userId) {
        return repo.findByUserId(userId);
    }

    @Override
    public Emergency updateStatus(String id, EmergencyStatus status) {

        Emergency e = repo.findById(id).orElseThrow();
        e.setStatus(status);
        e.setUpdatedAt(LocalDateTime.now());

        return repo.save(e);
    }
}