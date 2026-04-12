package com.core_service.entity;

import com.core_service.enums.EmergencyStatus;

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

    private String type;
    private EmergencyStatus status;

    private String description;   // 🔥 UI se add
    private String severity;      // LOW / HIGH / CRITICAL

    private double latitude;
    private double longitude;
    private String address;       // 🔥 UI location

    private String hospitalId;
    private String volunteerId;

    private int etaMinutes;       // 🔥 UI ETA

    private int priority;

    private boolean resolved;     // 🔥 history ke liye

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}