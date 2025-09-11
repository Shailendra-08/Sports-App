package com.example.auth_service.controller;

import com.example.auth_service.kafka.KafkaProducerService;
import com.example.auth_service.model.User;
import com.example.auth_service.repository.UserRepository;

import com.example.auth_service.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;
    private final KafkaProducerService kafkaProducer;

    public AuthController(UserRepository userRepo, JwtUtil jwtUtil, KafkaProducerService kafkaProducer) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            kafkaProducer.sendAuthEvent("auth-events", "Registration failed for user: " + user.getUsername());
            return "Username already exists!";
        }
        userRepo.save(user);
        kafkaProducer.sendAuthEvent("auth-events", "User registered: " + user.getUsername());
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {
        User user = userRepo.findByUsername(loginUser.getUsername());
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            kafkaProducer.sendAuthEvent("auth-events", "Login success: " + loginUser.getUsername());
            return jwtUtil.generateToken(user.getUsername());
        }
        kafkaProducer.sendAuthEvent("auth-events", "Login failed: " + loginUser.getUsername());
        return "Invalid credentials";
    }

    // Example of manual JWT check without filter
    @GetMapping("/secure")
    public String secureEndpoint(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);
                return "Hello " + username + ", you accessed a secure endpoint!";
            }
        }
        return "Invalid or missing token";
    }
}
