package com.example.UserProfile.entity;

import jakarta.persistence.*;


@Entity
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String fullName;

    @Column(nullable=false, unique=true)
    private String email;

    private Integer age;
    private String bio;

    // getters/setters
    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}
    public String getFullName(){return fullName;}
    public void setFullName(String fullName){this.fullName=fullName;}
    public String getEmail(){return email;}
    public void setEmail(String email){this.email=email;}
    public Integer getAge(){return age;}
    public void setAge(Integer age){this.age=age;}
    public String getBio(){return bio;}
    public void setBio(String bio){this.bio=bio;}
}
