package com.emergency.ai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "ai_logs")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AIInteractionLog {

    @Id
    private String id;

    private String message;
    private String response;
    private String type;
    private LocalDateTime timestamp;
}