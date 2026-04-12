package com.core_service.dto;

import lombok.Data;

@Data
public class EmergencyRequest {

    private String description;
    private String type;
    private String severity;

    private double latitude;
    private double longitude;
    private String address;

    private String patientName;
    private int age;
    private String contactNumber;
    private String medicalConditions;
}