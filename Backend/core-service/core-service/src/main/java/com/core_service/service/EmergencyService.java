package com.core_service.service;

import com.core_service.dto.EmergencyRequest;
import com.core_service.entity.Emergency;
import com.core_service.enums.EmergencyStatus;

import java.util.List;

public interface EmergencyService {
    Emergency createEmergency(String userId, EmergencyRequest req);
    List<Emergency> getActiveEmergencies();
    List<Emergency> getUserHistory(String userId);
    Emergency updateStatus(String id, EmergencyStatus status);
}