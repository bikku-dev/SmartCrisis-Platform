package com.core_service.controller;

import com.core_service.entity.Volunteer;
import com.core_service.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/volunteers")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerService service;

    // ➕ Add volunteer
    @PostMapping
    public Volunteer save(@RequestBody Volunteer volunteer) {
        return service.save(volunteer);
    }

    // 📋 Get all volunteers
    @GetMapping
    public List<Volunteer> getAll() {
        return service.getAll();
    }

    // 📍 Find available nearest
    @GetMapping("/available")
    public Volunteer findAvailable(@RequestParam double lat,
                                   @RequestParam double lon) {
        return service.findAvailable(lat, lon);
    }
}