package com.core_service.controller;

import com.core_service.entity.Hospital;
import com.core_service.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService service;

    // ➕ Add hospital
    @PostMapping
    public Hospital save(@RequestBody Hospital hospital) {
        return service.save(hospital);
    }

    // 📋 Get all hospitals
    @GetMapping
    public List<Hospital> getAll() {
        return service.getAll();
    }

    // 📍 Find nearest
    @GetMapping("/nearest")
    public Hospital findNearest(@RequestParam double lat,
                                @RequestParam double lon) {
        return service.findNearest(lat, lon);
    }
}