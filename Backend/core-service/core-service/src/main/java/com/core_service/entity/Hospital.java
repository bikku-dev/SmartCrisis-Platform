package com.core_service.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hospitals")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {

    @Id
    private String id;

    private String name;

    private double latitude;
    private double longitude;

    private int availableBeds;
    private int icuBeds;

    private boolean emergencySupport;
}