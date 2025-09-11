package com.example.auth_service_kafka.kafka;


import com.example.auth_service_kafka.entity.AuthUser;
import com.example.auth_service_kafka.repository.AuthUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerConfig {

    @Autowired
    private AuthUserRepository repo;

    private final ObjectMapper mapper = new ObjectMapper();
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @KafkaListener(topics = "${app.kafka.topic:user-credentials}", groupId = "auth-service")
    public void listen(String message) {
        try {
            CredentialMessage m = mapper.readValue(message, CredentialMessage.class);
            if (m.getEmail() == null || m.getPassword() == null) return;

            // skip if already exists
            if (repo.findByEmail(m.getEmail()).isPresent()) return;

            String hash = encoder.encode(m.getPassword());
            AuthUser user = new AuthUser();
            user.setEmail(m.getEmail());
            user.setPasswordHash(hash);
            repo.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
