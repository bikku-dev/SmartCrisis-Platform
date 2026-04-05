package com.emergency.ai.util;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public String buildEmergencyPrompt(String input) {
        return """
        Classify the emergency type.

        Categories:
        - CARDIAC
        - ACCIDENT
        - FIRE
        - GENERAL

        Input: %s

        Only return category.
        """.formatted(input);
    }
}
