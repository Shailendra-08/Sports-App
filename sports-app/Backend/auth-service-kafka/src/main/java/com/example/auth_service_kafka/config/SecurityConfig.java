package com.example.auth_service_kafka.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // new lambda style
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login","/api/auth/register" ,"/actuator/**").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();
    }
}
