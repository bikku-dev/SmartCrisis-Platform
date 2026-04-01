package com.core_service.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blood_stock")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BloodStock {

    @Id
    private String id;

    private String hospitalId;

    private String bloodGroup;
    private int unitsAvailable;
}