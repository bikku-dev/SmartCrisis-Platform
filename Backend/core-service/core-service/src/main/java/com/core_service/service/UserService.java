package com.core_service.service;

import com.core_service.dto.UserSettingsRequest;
import com.core_service.entity.Contact;
import com.core_service.entity.MedicalInfo;
import com.core_service.entity.User;

public interface UserService {

    User getOrCreateUser(String keycloakId, String username, String email);

    User updateProfile(String keycloakId, User user);

    User updateMedical(String keycloakId, MedicalInfo medicalInfo);

    User addContact(String keycloakId, Contact contact);

    User removeContact(String keycloakId, int index);

    User updateSettings(String keycloakId, UserSettingsRequest request);

    User registerUser(String username, String email, String password,
                      String firstName, String lastName, String phone);
}