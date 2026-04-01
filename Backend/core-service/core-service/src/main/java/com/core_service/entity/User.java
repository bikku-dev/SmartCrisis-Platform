package com.core_service.entity;

import com.core_service.enums.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    private String name;
    private String phone;

    private Role role;

    private double latitude;
    private double longitude;

    private LocalDateTime createdAt;
}