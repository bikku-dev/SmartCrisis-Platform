package com.core_service.entity;

import com.core_service.enums.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


import org.springframework.data.mongodb.core.index.Indexed;


import java.util.List;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String keycloakId;

    private String username;
    private String email;
    private String phone;
    private String firstName;   // 🔥 ADD
    private String lastName;    // 🔥 ADD


    private Role role;

    private double latitude;
    private double longitude;
    private boolean verified;
    private String address;

    private LocalDateTime createdAt = LocalDateTime.now();

    private MedicalInfo medicalInfo;
    private boolean locationSharingEnabled; // 🔥 toggle from UI
    private boolean emergencyAlertsEnabled; // 🔥 toggle
    private boolean shareMedicalInfo;       // 🔥 toggle
    private List<Contact> contacts;
}