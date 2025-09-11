package com.example.auth_service.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaTopicConfig {
    @Bean
    public NewTopic authTopic() {
        return new NewTopic("authentication", 1, (short) 1);
    }
}

