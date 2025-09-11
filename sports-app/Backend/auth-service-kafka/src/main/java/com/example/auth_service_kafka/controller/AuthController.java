package com.example.auth_service_kafka.controller;

import com.example.auth_service_kafka.dto.LoginRequest;
import com.example.auth_service_kafka.dto.AuthRegisterRequest;
import com.example.auth_service_kafka.dto.JwtResponse;
import com.example.auth_service_kafka.entity.AuthUser;
import com.example.auth_service_kafka.repository.AuthUserRepository;
import com.example.auth_service_kafka.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthUserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req){
        if(req.getEmail() == null || req.getPassword() == null){
            return ResponseEntity.badRequest().body("email and password required");
        }

        Optional<AuthUser> opt = repo.findByEmail(req.getEmail());
        if(opt.isEmpty()){
            return ResponseEntity.status(401).body("invalid credentials");
        }
        AuthUser u = opt.get();
        if(!encoder.matches(req.getPassword(), u.getPasswordHash())){
            return ResponseEntity.status(401).body("invalid credentials");
        }

        String token = jwtUtil.generateToken(u.getEmail());
        Map<String,String> resp = new HashMap<>();
        resp.put("token", token);
        return ResponseEntity.ok(resp);
    }

    // ✅ New endpoint for UserProfile service
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRegisterRequest req) {
        // ⚠️ Do NOT save user here (Kafka consumer already handles DB insert)

        // Just generate JWT for this email
        String token = jwtUtil.generateToken(req.getEmail());

        return ResponseEntity.ok(new JwtResponse(token));
    }
}
