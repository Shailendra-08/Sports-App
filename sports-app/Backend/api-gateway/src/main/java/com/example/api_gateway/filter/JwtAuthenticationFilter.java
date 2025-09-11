package com.example.api_gateway.filter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.example.api_gateway.util.JwtUtil;

import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        // ✅ Skip JWT check for auth service (login/register)
        if (path.startsWith("/api/auth/login") || path.startsWith("/api/user/register") || path.startsWith("/api/fav/")) {
            return chain.filter(exchange);
        }


        // ✅ Extract Authorization Header
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        // ✅ Validate Token
        if (!jwtUtil.validateToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            // System.out.print("Unauthorized");
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }
}
