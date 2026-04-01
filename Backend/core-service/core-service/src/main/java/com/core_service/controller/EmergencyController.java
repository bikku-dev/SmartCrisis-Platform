package com.core_service.controller;

import com.core_service.dto.AssignResponseDTO;
import com.core_service.dto.EmergencyRequestDTO;
import com.core_service.entity.Emergency;
import com.core_service.enums.EmergencyStatus;
import com.core_service.service.EmergencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergencies")
@RequiredArgsConstructor
public class EmergencyController {

    private final EmergencyService service;

    // 🚨 Create Emergency
    @PostMapping
    public AssignResponseDTO create(@RequestBody EmergencyRequestDTO dto) {
        return service.createEmergency(dto);
    }

    // 🔍 Get by ID
    @GetMapping("/{id}")
    public Emergency getById(@PathVariable String id) {
        return service.getById(id);
    }

    // 📋 Get all
    @GetMapping
    public List<Emergency> getAll() {
        return service.getAll();
    }

    // 🔄 Update status
    @PutMapping("/{id}/status")
    public Emergency updateStatus(@PathVariable String id,
                                  @RequestParam EmergencyStatus status) {
        return service.updateStatus(id, status);
    }
}