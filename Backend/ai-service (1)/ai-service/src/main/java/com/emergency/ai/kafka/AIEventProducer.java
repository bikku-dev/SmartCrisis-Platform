//package com.emergency.ai.kafka;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.kafka.core.KafkaTemplate;
//@Service
//@RequiredArgsConstructor
//public class AIEventProducer {
//
//    private final KafkaTemplate<String, String> kafkaTemplate;
//
//    public void sendEmergencyEvent(String event) {
//        kafkaTemplate.send("emergency-topic", event);
//    }
//}
