package com.emergency.ai.service;

import com.emergency.ai.util.PromptBuilder;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmergencyClassifier {

    private final WebClient webClient;
    private final PromptBuilder promptBuilder;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.model}")
    private String model;

    public String classifyEmergency(String input) {

        String prompt = promptBuilder.buildEmergencyPrompt(input);

        Map<String, Object> request = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        return webClient.post()
                .uri(apiUrl)
                .header("Authorization", "Bearer " + apiKey)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(res -> res.get("choices").get(0).get("message").get("content").asText())
                .block();
    }
}