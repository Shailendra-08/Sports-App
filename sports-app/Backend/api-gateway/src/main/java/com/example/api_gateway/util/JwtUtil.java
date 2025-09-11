package com.example.api_gateway.util;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
    try {
        extractAllClaims(token);
        System.out.print("Could extract");
        return true;
    } catch (Exception e) {
        System.out.println("Here");
        System.out.print("Could not extract this token: " + e.getMessage());
        e.printStackTrace(); // This will give you the full stack trace in logs
        return false;
    }
}

}
