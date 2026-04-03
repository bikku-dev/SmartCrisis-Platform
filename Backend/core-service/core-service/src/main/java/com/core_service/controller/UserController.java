package com.core_service.controller;

import com.core_service.entity.User;
import com.core_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    // ➕ Create user
    @PostMapping
    public User create(@RequestBody User user) {
        return service.create(user);
    }

    // 📋 Get all users
    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    // 🔍 Get by ID
    @GetMapping("/{id}")
    public User getById(@PathVariable String id) {
        return service.getById(id);
    }
}