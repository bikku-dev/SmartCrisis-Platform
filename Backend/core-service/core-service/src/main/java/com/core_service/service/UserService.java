package com.core_service.service;

import com.core_service.entity.Contact;
import com.core_service.entity.MedicalInfo;
import com.core_service.entity.User;

public interface UserService {

    User getByKeycloak(String keycloakId);

    User updateMedical(String keycloakId, MedicalInfo medicalInfo);

    User addContact(String keycloakId, Contact contact);

    User getOrCreateUser(String keycloakId, String name, String email);
}