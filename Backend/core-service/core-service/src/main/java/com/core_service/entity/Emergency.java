package com.core_service.entity;

import com.core_service.enums.EmergencyStatus;
import com.core_service.enums.EmergencyType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "emergencies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Emergency {

    @Id
    private String id;

    private String userId;

    private EmergencyType type;
    private EmergencyStatus status;

    private double latitude;
    private double longitude;

    private String hospitalId;
    private String volunteerId;

    private int priority;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}