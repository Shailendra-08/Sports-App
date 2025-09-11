package com.example.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
// import org.springframework.boot.web.servlet.FilterRegistrationBean;
// import org.springframework.context.annotation.Bean;
// import org.springframework.core.Ordered;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(AuthServiceApplication.class, args);
	}


}
