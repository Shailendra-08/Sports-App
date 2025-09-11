package com.example.favorites_service.kafka;

import com.example.favorites_service.model.Favorite;
import com.example.favorites_service.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class FavoriteConsumer {

    @Autowired
    private FavoriteService favoriteService;

    @KafkaListener(topics = "favorite-topic", groupId = "favorite-group")
    public void consume(Favorite favorite) {
        favoriteService.addFavorite(favorite);
        System.out.println("Consumed favorite: " + favorite);
    }
}

