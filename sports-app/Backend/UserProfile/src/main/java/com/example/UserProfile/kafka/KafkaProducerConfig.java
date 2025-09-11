package com.example.UserProfile.kafka;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class KafkaProducerConfig {
    @Value("${app.kafka.topic:user-credentials}")
    private String topic;

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendCredentials(String email, String password){
        try{
            CredentialMessage m = new CredentialMessage(email, password);
            String payload = objectMapper.writeValueAsString(m);
            kafkaTemplate.send(topic, email, payload);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}
