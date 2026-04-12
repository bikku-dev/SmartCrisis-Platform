package com.core_service.service.impl;

import com.core_service.dto.UserSettingsRequest;
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

    private final UserRepository userRepo;

    @Override
    public User getOrCreateUser(String keycloakId, String username, String email) {

        return userRepo.findByKeycloakId(keycloakId)
                .orElseGet(() -> {

                    User user = User.builder()
                            .keycloakId(keycloakId)
                            .username(username)
                            .email(email)
                            .verified(true)
                            .createdAt(LocalDateTime.now())
                            .build();

                    return userRepo.save(user);
                });
    }

    @Override
    public User updateProfile(String keycloakId, User updated) {

        User user = getUser(keycloakId);

        user.setFirstName(updated.getFirstName());
        user.setLastName(updated.getLastName());
        user.setPhone(updated.getPhone());
        user.setAddress(updated.getAddress());

        return userRepo.save(user);
    }

    @Override
    public User updateMedical(String keycloakId, MedicalInfo medicalInfo) {

        User user = getUser(keycloakId);
        user.setMedicalInfo(medicalInfo);

        return userRepo.save(user);
    }

    @Override
    public User addContact(String keycloakId, Contact contact) {

        User user = getUser(keycloakId);

        if (user.getContacts() == null) {
            user.setContacts(new ArrayList<>());
        }

        user.getContacts().add(contact);

        return userRepo.save(user);
    }

    @Override
    public User removeContact(String keycloakId, int index) {

        User user = getUser(keycloakId);

        if (user.getContacts() != null && index < user.getContacts().size()) {
            user.getContacts().remove(index);
        }

        return userRepo.save(user);
    }

    @Override
    public User updateSettings(String keycloakId, UserSettingsRequest req) {

        User user = getUser(keycloakId);

        user.setLocationSharingEnabled(req.isLocationSharingEnabled());
        user.setEmergencyAlertsEnabled(req.isEmergencyAlertsEnabled());
        user.setShareMedicalInfo(req.isShareMedicalInfo());

        return userRepo.save(user);
    }

    @Override
    public User registerUser(String username, String email, String password,
                             String firstName, String lastName, String phone) {

        User user = User.builder()
                .username(username)
                .email(email)
                .phone(phone)
                .firstName(firstName)
                .lastName(lastName)
                .verified(true)
                .createdAt(LocalDateTime.now())
                .build();

        return userRepo.save(user);
    }

    private User getUser(String keycloakId) {
        return userRepo.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}