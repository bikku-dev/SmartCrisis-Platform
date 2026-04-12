package com.core_service.controller;

import com.core_service.dto.RegisterRequest;
import com.core_service.entity.User;
import com.core_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/public/users")
@RequiredArgsConstructor
public class AuthController {

    private final UserService service;

    @PostMapping("/register")
    public User register(@Valid @RequestBody RegisterRequest request) {
        return service.registerUser(
                request.getUsername(),
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName(),
                request.getPhone()
        );
    }

    @PostMapping("/auth/token")
    public ResponseEntity<?> getToken(@RequestBody Map<String, String> body) {

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://localhost:8080/realms/Crises-app/protocol/openid-connect/token";

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "spring-client");
        params.add("code", body.get("code"));
        params.add("redirect_uri", "http://localhost:5173/dashboard");
        params.add("code_verifier", body.get("code_verifier"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);

        return ResponseEntity.ok(response.getBody());
    }
}