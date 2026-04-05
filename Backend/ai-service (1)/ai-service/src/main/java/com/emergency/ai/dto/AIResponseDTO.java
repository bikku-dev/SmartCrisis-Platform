package com.emergency.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AIResponseDTO {
    private String emergencyType;
    private String response;
}
