package com.core_service.service.impl;

import com.core_service.entity.Contact;
import com.core_service.entity.MedicalInfo;
import com.core_service.entity.User;
import com.core_service.repository.UserRepository;
import com.core_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repo;

    // ✅ Auto create user on first login
    @Override
    public User getByKeycloak(String keycloakId) {
        return repo.findByKeycloakId(keycloakId)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .keycloakId(keycloakId)
                            .createdAt(LocalDateTime.now())
                            .contacts(new ArrayList<>())
                            .build();
                    return repo.save(newUser);
                });
    }

    @Override
    public User updateMedical(String keycloakId, MedicalInfo medicalInfo) {
        User user = repo.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setMedicalInfo(medicalInfo);
        return repo.save(user);
    }
    public User getOrCreateUser(String keycloakId, String name, String email) {

        return repo.findByKeycloakId(keycloakId)
                .orElseGet(() -> {

                    User newUser = User.builder()
                            .keycloakId(keycloakId)
                            .name(name)
                            .email(email)   // 👈 add in entity
                            .createdAt(LocalDateTime.now())
                            .contacts(new ArrayList<>())
                            .build();

                    return repo.save(newUser);
                });
    }

    @Override
    public User addContact(String keycloakId, Contact contact) {
        User user = repo.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getContacts() == null) {
            user.setContacts(new ArrayList<>());
        }

        user.getContacts().add(contact);
        return repo.save(user);
    }
}