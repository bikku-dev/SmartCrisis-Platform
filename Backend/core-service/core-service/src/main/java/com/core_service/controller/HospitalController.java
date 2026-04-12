package com.core_service.controller;

import com.core_service.entity.Hospital;

import com.core_service.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/core/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService service;


    @GetMapping("/nearby")
    public List<Hospital> getNearby(@RequestParam double lat,
                                    @RequestParam double lng) {
        return service.getNearby(lat, lng);
    }
}
