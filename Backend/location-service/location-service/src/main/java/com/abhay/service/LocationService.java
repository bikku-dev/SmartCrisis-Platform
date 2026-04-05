package com.abhay.service;

import com.abhay.dto.LocationDTO;
import com.abhay.model.Location;
import com.abhay.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service

public class LocationService {

    private final LocationRepository repository;
    private final RedisTemplate<String, Object> redisTemplate;

    public LocationService(LocationRepository repository, RedisTemplate<String, Object> redisTemplate, SimpMessagingTemplate messagingTemplate) {
        this.repository = repository;
        this.redisTemplate = redisTemplate;
        this.messagingTemplate = messagingTemplate;
    }

    private final SimpMessagingTemplate messagingTemplate;


    public void updateLocation(LocationDTO dto) {

        // 1. Save in MongoDB (history)
        Location location = new Location(
                null,
                dto.getUserId(),
                dto.getLatitude(),
                dto.getLongitude(),
                System.currentTimeMillis()
        );

        repository.save(location);

        // 2. Save latest location in Redis
        redisTemplate.opsForValue().set(
                "location:" + dto.getUserId(),
                dto
        );

        // 3. Push real-time update via WebSocket
        messagingTemplate.convertAndSend(
                "/topic/location/" + dto.getUserId(),
                dto
        );
    }
}