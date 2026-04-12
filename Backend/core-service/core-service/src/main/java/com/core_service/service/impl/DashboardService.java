package com.core_service.service.impl;

import com.core_service.dto.DashboardResponse;
import com.core_service.enums.EmergencyStatus;
import com.core_service.repository.EmergencyRepository;
import com.core_service.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmergencyRepository emergencyRepo;
    private final VolunteerRepository volunteerRepo;

    public DashboardResponse getDashboard() {

        int activeCases = emergencyRepo.findByStatus(EmergencyStatus.ACTIVE).size();
        int nearbyUnits = (int) volunteerRepo.count();

        return DashboardResponse.builder()
                .avgResponseTime(9.5) // 🔥 static or calculate later
                .activeCases(activeCases)
                .nearbyUnits(nearbyUnits)
                .build();
    }
}