package com.shailendra.spring_ai.service;
//
//import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
//import io.netty.handler.ssl.SslContextBuilder;
//import org.springframework.http.client.reactive.ReactorClientHttpConnector;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//import reactor.netty.http.client.HttpClient;
//
//import javax.annotation.PostConstruct;
//import javax.net.ssl.SSLException;
//import java.util.Map;
//
//@Service
//public class GeminiService {
//
//    private WebClient webClient;
//
//    @PostConstruct
//    public void init() {
//        HttpClient httpClient = HttpClient.create()
//                .secure(t -> {
//                    try {
//                        t.sslContext(
//                                SslContextBuilder.forClient()
//                                        .trustManager(InsecureTrustManagerFactory.INSTANCE).build());
//                    } catch (SSLException e) {
//                        throw new RuntimeException(e);
//                    }
//                });
//
//        this.webClient = WebClient.builder()
//                .clientConnector(new ReactorClientHttpConnector(httpClient))
//                .baseUrl("https://generativelanguage.googleapis.com")
//                .build();
//    }
//
//    public Mono<String> getGeminiResponse(String prompt) {
//        // Replace YOUR_API_KEY with your actual API key
//        String apiKey = "AIzaSyD5zK3k7IzfrH8275OjTIUyoAqYmSg8Nos";
//
//        return webClient.post()
//                .uri(uriBuilder -> uriBuilder
//                        .path("/v1beta/models/gemini-2.0-flash:generateContent")
//                        .queryParam("key", apiKey)
//                        .build())
//                .bodyValue(Map.of(
//                        "prompt", Map.of("text", prompt),
//                        "temperature", 0.7,
//                        "candidateCount", 1,
//                        "maxOutputTokens", 1024
//                ))
//                .retrieve()
//                .bodyToMono(String.class);
//    }
//
//}






import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import io.netty.handler.ssl.SslContextBuilder;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import javax.annotation.PostConstruct;
import javax.net.ssl.SSLException;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    private WebClient webClient;

    @PostConstruct
    public void init() {
        HttpClient httpClient = HttpClient.create()
                .secure(t -> {
                    try {
                        t.sslContext(SslContextBuilder.forClient()
                                .trustManager(InsecureTrustManagerFactory.INSTANCE).build());
                    } catch (SSLException e) {
                        throw new RuntimeException(e);
                    }
                });

        this.webClient = WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    public Mono<String> getGeminiResponse(String prompt) {
        String apiKey = "AIzaSyDymDhBiIvEihOP78aK3XU9xp3qBrQc5UQ";  // API key

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                ),
                "generationConfig", Map.of(
                        "temperature", 0.7,
                        "candidateCount", 1,
                        "maxOutputTokens", 1024
                )
        );

        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-2.0-flash:generateContent")
                        .queryParam("key", apiKey)
                        .build())
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class);
    }

}
