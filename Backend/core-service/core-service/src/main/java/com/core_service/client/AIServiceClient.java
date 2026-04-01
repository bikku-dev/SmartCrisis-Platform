package com.core_service.client;

import org.springframework.stereotype.Component;

@Component
public class AIServiceClient {

    public String detectType(String message) {

        // TEMP MOCK (later AI service call)
        if (message.toLowerCase().contains("heart")) return "CARDIAC";
        if (message.toLowerCase().contains("accident")) return "ACCIDENT";

        return "GENERAL";
    }
}