package com.core_service.controller;

import com.core_service.dto.UserSettingsRequest;
import com.core_service.entity.Contact;
import com.core_service.entity.MedicalInfo;
import com.core_service.entity.User;
import com.core_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping("/me")
    public User getUser(@AuthenticationPrincipal Jwt jwt) {
        return service.getOrCreateUser(
                jwt.getSubject(),
                jwt.getClaim("preferred_username"),
                jwt.getClaim("email")
        );
    }

    @PutMapping("/profile")
    public User updateProfile(@AuthenticationPrincipal Jwt jwt,
                              @RequestBody User user) {
        return service.updateProfile(jwt.getSubject(), user);
    }

    @PutMapping("/medical")
    public User updateMedical(@AuthenticationPrincipal Jwt jwt,
                              @RequestBody MedicalInfo medicalInfo) {
        return service.updateMedical(jwt.getSubject(), medicalInfo);
    }

    @PostMapping("/contacts")
    public User addContact(@AuthenticationPrincipal Jwt jwt,
                           @RequestBody Contact contact) {
        return service.addContact(jwt.getSubject(), contact);
    }

    @DeleteMapping("/contacts/{index}")
    public User deleteContact(@AuthenticationPrincipal Jwt jwt,
                              @PathVariable int index) {
        return service.removeContact(jwt.getSubject(), index);
    }

    @PutMapping("/settings")
    public User updateSettings(@AuthenticationPrincipal Jwt jwt,
                               @RequestBody UserSettingsRequest request) {
        return service.updateSettings(jwt.getSubject(), request);
    }
}