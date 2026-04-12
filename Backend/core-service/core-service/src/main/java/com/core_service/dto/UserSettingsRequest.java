package com.core_service.dto;

import lombok.Data;

@Data
public class UserSettingsRequest {

    private boolean locationSharingEnabled;
    private boolean emergencyAlertsEnabled;
    private boolean shareMedicalInfo;
}