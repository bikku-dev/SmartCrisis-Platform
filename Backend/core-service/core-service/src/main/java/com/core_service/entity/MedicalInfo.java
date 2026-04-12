package com.core_service.entity;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalInfo {

    private String bloodType;
    private List<String> allergies;
    private List<String> conditions;
    private List<String> medications;
}