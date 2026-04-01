package com.core_service.service;

import com.core_service.entity.User;

import java.util.List;

public interface UserService {
    User create(User user);
    List<User> getAll();
    User getById(String id);
}
