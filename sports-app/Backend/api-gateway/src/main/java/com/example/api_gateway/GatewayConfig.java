package com.example.api_gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()

                // ✅ Auth Service Route
                .route("auth-service", r -> r.path("/api/auth/**")
                        // .filters(f -> f.stripPrefix(1))
                        .uri("lb://auth-service"))

                // ✅ User Profile Service Route
                .route("userprofile-service", r -> r.path("/api/user/**")
                        // Uncomment if you need prefix stripping
                        //.filters(f -> f.stripPrefix(1))
                        .uri("lb://userprofile-service"))
                .route("favorites-service", r -> r.path("/api/fav/**")
                        // Uncomment if you need prefix stripping
                        .filters(f -> f.stripPrefix(2))
                        .uri("lb://favorites-service"))
                .route("league-service", r -> r.path("/api/league/**")
                        // Uncomment if you need prefix stripping
                        .filters(f -> f.stripPrefix(2))
                        .uri("lb://league-service"))
                .route("spring-ai", r -> r.path("/api/gemini/**")
                        // Uncomment if you need prefix stripping
                        .filters(f -> f.stripPrefix(2))
                        .uri("lb://spring-ai"))

                .build();
    }
}
