package com.crises.app;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {


    private String id;

    private String name;
    private String phone;
    private String role;

    private String keycloakId;

    private double latitude;
    private double longitude;

    private LocalDateTime createdAt;
}