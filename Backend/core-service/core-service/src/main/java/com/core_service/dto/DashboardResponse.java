package com.core_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {
    private double avgResponseTime;
    private int activeCases;
    private int nearbyUnits;
}