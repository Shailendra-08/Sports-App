package com.example.favorites_service.controller;

import java.util.List;

import com.example.favorites_service.kafka.FavoriteProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.favorites_service.model.Favorite;
import com.example.favorites_service.service.FavoriteService;

@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteProducer favoriteProducer;

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity<Favorite> addFavorite(@RequestBody Favorite favorite) {
        favoriteProducer.sendFavorite(favorite);
        return ResponseEntity.ok(favorite);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Favorite>> getFavoritesByUserId(@PathVariable String email) {
        List<Favorite> favorites = favoriteService.getFavoritesByUserId(email);
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteFavorite(@RequestParam String email, @RequestParam int idLeague) {
        favoriteService.deleteFavorite(email, idLeague);
        return ResponseEntity.noContent().build();
    }
}
