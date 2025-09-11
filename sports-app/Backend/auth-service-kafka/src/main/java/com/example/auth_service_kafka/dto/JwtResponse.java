package com.example.auth_service_kafka.dto;


public class JwtResponse {
    private String token;

    public JwtResponse() {}
    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
