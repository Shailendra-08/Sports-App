package com.example.auth_service_kafka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthServiceKafkaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceKafkaApplication.class, args);
	}

}
