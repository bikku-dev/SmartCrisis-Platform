package com.core_service.controller;

import com.core_service.entity.Contact;
import com.core_service.entity.MedicalInfo;
import com.core_service.entity.User;
import com.core_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    // ✅ Get current user (auto create)
    @GetMapping("/me")
    public User getUser(@AuthenticationPrincipal Jwt jwt) {

        String keycloakId = jwt.getSubject();
        String name = jwt.getClaim("preferred_username"); // or "name"
        String email = jwt.getClaim("email");

        return service.getOrCreateUser(keycloakId, name, email);
    }

    // ✅ Update medical info
    @PutMapping("/medical")
    public User updateMedical(@AuthenticationPrincipal Jwt jwt,
                              @RequestBody MedicalInfo medicalInfo) {
        return service.updateMedical(jwt.getSubject(), medicalInfo);
    }

    // ✅ Add contact
    @PostMapping("/contacts")
    public User addContact(@AuthenticationPrincipal Jwt jwt,
                           @RequestBody Contact contact) {
        return service.addContact(jwt.getSubject(), contact);
    }
}