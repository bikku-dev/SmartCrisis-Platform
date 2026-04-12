package com.core_service.controller;

import com.core_service.dto.EmergencyRequest;
import com.core_service.entity.Emergency;
import com.core_service.enums.EmergencyStatus;


import com.core_service.service.EmergencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/emergencies")
@RequiredArgsConstructor
public class EmergencyController {

    private final EmergencyService service;

    // ✅ Create Emergency
    @PostMapping
    public Emergency create(@RequestBody EmergencyRequest req,
                            @AuthenticationPrincipal Jwt jwt) {

        String userId = jwt.getSubject(); // ✔ Keycloak user ID
        return service.createEmergency(userId, req);
    }

    // ✅ Active Emergencies (Dashboard)
    @GetMapping("/active")
    public List<Emergency> active() {
        return service.getActiveEmergencies();
    }

    // ✅ User History
    @GetMapping("/history")
    public List<Emergency> history(@AuthenticationPrincipal Jwt jwt) {
        return service.getUserHistory(jwt.getSubject());

    }
    @PostMapping("/analyze")
    public Map<String, String> analyze(@RequestBody EmergencyRequest req) {

        // Dummy logic (replace with AI later)
        String severity = req.getDescription().contains("chest pain")
                ? "CRITICAL" : "LOW";

        return Map.of(
                "type", "MEDICAL",
                "severity", severity
        );
    }

    // ✅ Update Status (resolve / dispatch etc.)
    @PutMapping("/{id}/status")
    public Emergency update(@PathVariable String id,
                            @RequestParam EmergencyStatus status) {
        return service.updateStatus(id, status);
    }
}