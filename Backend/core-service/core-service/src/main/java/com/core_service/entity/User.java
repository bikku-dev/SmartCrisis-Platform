package com.core_service.entity;

import com.core_service.enums.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;




import lombok.*;

import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
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

    private String name;
    private String phone;
    private String email;

    private Role role;

    private double latitude;
    private double longitude;

    private LocalDateTime createdAt;

    private MedicalInfo medicalInfo;

    private List<Contact> contacts;
}