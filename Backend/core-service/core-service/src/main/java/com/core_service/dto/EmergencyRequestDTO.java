package com.core_service.dto;

import lombok.Data;

@Data
public class EmergencyRequestDTO {

    private String userId;
    private String message;
    private double latitude;
    private double longitude;
}