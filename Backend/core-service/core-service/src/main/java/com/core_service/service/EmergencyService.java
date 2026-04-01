package com.core_service.service;

import com.core_service.dto.AssignResponseDTO;
import com.core_service.dto.EmergencyRequestDTO;
import com.core_service.entity.Emergency;
import com.core_service.enums.EmergencyStatus;

import java.util.List;

public interface EmergencyService {

    AssignResponseDTO createEmergency(EmergencyRequestDTO dto);

    Emergency getById(String id);

    List<Emergency> getAll();

    Emergency updateStatus(String id, EmergencyStatus status);
}