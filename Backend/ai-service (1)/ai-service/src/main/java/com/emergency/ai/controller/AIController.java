package com.emergency.ai.controller;

import com.emergency.ai.dto.AIRequestDTO;
import com.emergency.ai.dto.AIResponseDTO;
import com.emergency.ai.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;
    @PostMapping("/process")
    public Mono<AIResponseDTO> process(@RequestBody AIRequestDTO request) {
        return Mono.fromCallable(() -> aiService.process(request))
                .subscribeOn(reactor.core.scheduler.Schedulers.boundedElastic());
    }
}
