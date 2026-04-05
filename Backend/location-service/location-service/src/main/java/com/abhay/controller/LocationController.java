package com.abhay.controller;

import com.abhay.dto.LocationDTO;
import com.abhay.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/location")

public class LocationController {

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    private final LocationService locationService;

    @PostMapping("/update")
    public ResponseEntity<String> updateLocation(@RequestBody LocationDTO dto) {
        locationService.updateLocation(dto);
        return ResponseEntity.ok("Location updated");
    }
    @GetMapping("/hello")
    public String hello(){
        return "Hello from location service";
    }
}