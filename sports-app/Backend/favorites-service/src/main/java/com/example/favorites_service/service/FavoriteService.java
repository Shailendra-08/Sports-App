package com.example.favorites_service.service;

import java.util.List;
import java.util.concurrent.TimeUnit;

import jakarta.transaction.Transactional;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.favorites_service.model.Favorite;
import com.example.favorites_service.repository.FavoriteRepository;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final KafkaTemplate<String, Favorite> kafkaTemplate;

    private final Cache<String, List<Favorite>> favoritesCache;

    private static final String KAFKA_TOPIC = "favorites-topic";

    public FavoriteService(FavoriteRepository favoriteRepository,
                           KafkaTemplate<String, Favorite> kafkaTemplate) {
        this.favoriteRepository = favoriteRepository;
        this.kafkaTemplate = kafkaTemplate;

        this.favoritesCache = Caffeine.newBuilder()
                .expireAfterWrite(10, TimeUnit.MINUTES)
                .maximumSize(10_000)
                .build();
    }

    public void addFavorite(Favorite favorite) {
        // Save to database
        favoriteRepository.save(favorite);

        String email = favorite.getEmail();

        // Reload from DB to ensure consistency
        List<Favorite> dbFavorites = favoriteRepository.findByEmail(email);
        favoritesCache.put(email, dbFavorites);

        // Send to Kafka
        kafkaTemplate.send(KAFKA_TOPIC, favorite);
    }



    public List<Favorite> getFavoritesByUserId(String email) {
        List<Favorite> cachedFavorites = favoritesCache.getIfPresent(email);
        if (cachedFavorites != null) {
            return cachedFavorites;
        }

        // Load from DB and cache it
        List<Favorite> dbFavorites = favoriteRepository.findByEmail(email);
        favoritesCache.put(email, dbFavorites);
        return dbFavorites;
    }

    @Transactional
    public void deleteFavorite(String email, int idLeague) {
        System.out.println("Attempting to delete favorite with email: " + email + " and idLeague: " + idLeague);

        List<Favorite> favoritesBefore = favoriteRepository.findByEmail(email);
        System.out.println("Favorites before deletion: " + favoritesBefore);

        favoriteRepository.deleteByEmailAndIdLeague(email, idLeague);

        List<Favorite> updatedFavorites = favoriteRepository.findByEmail(email);
        System.out.println("Favorites after deletion: " + updatedFavorites);

        favoritesCache.put(email, updatedFavorites);
    }


}
