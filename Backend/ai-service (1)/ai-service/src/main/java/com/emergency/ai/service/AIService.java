package com.emergency.ai.service;

import com.emergency.ai.dto.AIRequestDTO;
import com.emergency.ai.dto.AIResponseDTO;
import com.emergency.ai.model.AIInteractionLog;
import com.emergency.ai.repository.AIInteractionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AIService {

    private final EmergencyClassifier classifier;
    private final ChatbotService chatbotService;
    private final AIInteractionRepository repository;

    public AIResponseDTO process(AIRequestDTO request) {

        // 1. Emergency type detect
        String type = classifier.classifyEmergency(request.getMessage());

        // 2. AI response generate
        String response = chatbotService.getResponse(request.getMessage());

        // 3. Save to MongoDB
        AIInteractionLog log = AIInteractionLog.builder()
                .message(request.getMessage())
                .response(response)
                .type(type)
                .timestamp(LocalDateTime.now())
                .build();

        repository.save(log);

        // ❌ Kafka removed (no producer call)

        // 4. Return response
        return new AIResponseDTO(type, response);
    }
}