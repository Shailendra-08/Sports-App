package com.example.favorites_service.repository;

import java.util.List;

//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.favorites_service.model.Favorite;

@Repository
public interface FavoriteRepository extends MongoRepository<Favorite, Long> {

    // Custom query using stored procedure to get favorites by user ID
    // @Query(value = "CALL get_user_favorites(:userId)", nativeQuery = true)
    // List<Favorite> getFavoritesByUserId(@Param("userId") Long userId);

    // Optional: Find favorites directly using JPA method naming
    List<Favorite> findByEmail(String email);

    void deleteByEmailAndIdLeague(String email, int idLeague);
}
