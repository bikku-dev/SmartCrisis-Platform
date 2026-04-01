package com.core_service.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "volunteers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Volunteer {

    @Id
    private String id;

    private String name;

    private boolean available;

    private double latitude;
    private double longitude;

    private String phone;
}