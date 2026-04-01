package com.core_service.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignResponseDTO {


    private String emergencyId;
    private String status;
    private String emergencyType;

    private String userId;


    private String hospitalId;
    private String hospitalName;
    private double hospitalLatitude;
    private double hospitalLongitude;


    private String volunteerId;
    private String volunteerName;
    private String volunteerPhone;
    private double volunteerLatitude;
    private double volunteerLongitude;


    private String assignedAt;
}