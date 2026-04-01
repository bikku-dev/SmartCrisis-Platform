package com.core_service.service.impl;


import com.core_service.client.AIServiceClient;
import com.core_service.dto.AssignResponseDTO;
import com.core_service.dto.EmergencyRequestDTO;
import com.core_service.entity.Emergency;
import com.core_service.entity.Hospital;
import com.core_service.entity.Volunteer;
import com.core_service.enums.EmergencyStatus;
import com.core_service.enums.EmergencyType;
import com.core_service.repository.EmergencyRepository;
import com.core_service.service.EmergencyService;
import com.core_service.service.HospitalService;
import com.core_service.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmergencyServiceImpl implements EmergencyService {

    private final EmergencyRepository emergencyRepo;
    private final HospitalService hospitalService;
    private final VolunteerService volunteerService;
    private final AIServiceClient aiClient;

    @Override
    public AssignResponseDTO createEmergency(EmergencyRequestDTO dto) {

        Emergency emergency = Emergency.builder()
                .id(UUID.randomUUID().toString())
                .userId(dto.getUserId())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .status(EmergencyStatus.CREATED)
                .createdAt(LocalDateTime.now())
                .build();

        // AI detect
        String typeStr = aiClient.detectType(dto.getMessage());
        emergency.setType(EmergencyType.valueOf(typeStr));

        // services call
        Hospital hospital = hospitalService.findNearest(dto.getLatitude(), dto.getLongitude());
        Volunteer volunteer = volunteerService.findAvailable(dto.getLatitude(), dto.getLongitude());

        // assign
        emergency.setHospitalId(hospital.getId());
        emergency.setVolunteerId(volunteer.getId());
        emergency.setStatus(EmergencyStatus.ASSIGNED);

        emergencyRepo.save(emergency);

        return AssignResponseDTO.builder()
                .emergencyId(emergency.getId())
                .hospitalId(hospital.getId())
                .hospitalName(hospital.getName())
                .volunteerId(volunteer.getId())
                .volunteerName(volunteer.getName())
                .status(emergency.getStatus().name())
                .build();
    }

    @Override
    public Emergency getById(String id) {
        return emergencyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Emergency not found"));
    }

    @Override
    public List<Emergency> getAll() {
        return emergencyRepo.findAll();
    }

    @Override
    public Emergency updateStatus(String id, EmergencyStatus status) {
        Emergency e = getById(id);
        e.setStatus(status);
        return emergencyRepo.save(e);
    }
}