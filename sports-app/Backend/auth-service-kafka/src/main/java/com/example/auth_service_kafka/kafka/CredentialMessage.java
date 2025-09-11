package com.example.auth_service_kafka.kafka;

public class CredentialMessage {
    private String email;
    private String password;
    public CredentialMessage(){}
    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }
    public String getPassword(){ return password; }
    public void setPassword(String password){ this.password = password; }
}
