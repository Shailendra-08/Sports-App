package com.example.auth_service_kafka.repository;

import com.example.auth_service_kafka.entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AuthUserRepository extends JpaRepository<AuthUser, Long> {
    Optional<AuthUser> findByEmail(String email);
}
