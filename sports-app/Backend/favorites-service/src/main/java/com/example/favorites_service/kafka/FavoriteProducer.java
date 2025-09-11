package com.example.favorites_service.kafka;

import com.example.favorites_service.model.Favorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class FavoriteProducer {

    @Autowired
    private KafkaTemplate<String, Favorite> kafkaTemplate;

    private final String TOPIC = "favorite-topic";

    public void sendFavorite(Favorite favorite) {
        kafkaTemplate.send(TOPIC, favorite);
    }
}

