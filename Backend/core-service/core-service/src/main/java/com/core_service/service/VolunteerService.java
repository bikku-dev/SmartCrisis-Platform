package com.core_service.service;

import com.core_service.entity.Volunteer;

import java.util.List;

public interface VolunteerService {
    Volunteer save(Volunteer v);
    List<Volunteer> getAll();
    Volunteer findAvailable(double lat, double lon);
}