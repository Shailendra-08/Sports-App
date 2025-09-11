package com.example.favorites_service.model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.data.mongodb.core.mapping.Document;

@Entity
//@Table(name = "favorite")
@Document(collection = "favorites")
public class Favorite {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

//    @Column(name = "strLeague", nullable = false)
    private String strLeague;

//    @Column(name = "strSport", nullable = false)
    private String strSport;

//    @Column(name = "strCountry", nullable = false)
    private String strCountry;

//    @Column(name = "idLeague", nullable = false)
    private int idLeague;

//    @Column(name = "strAlternate", nullable = false)
    private String strAlternate;

//    @Column(name = "strYoutube", nullable = false)
    private String strYoutube;

//    @Column(name = "strWebsite", nullable = false)
    private String strWebsite;

//    @Column(name = "strBadge", nullable = false)
    private String strBadge;

//    @Column(name = "email", nullable = false)
    private String email;


    // Default constructor
    public Favorite() {
    }

    // Parameterized constructor
    public Favorite(String id, String strLeague, String strSport, String strCountry, int idLeague, String strAlternate, String strYoutube, String strWebsite, String strBadge, String email) {

        this.id = id;
        this.strLeague = strLeague;
        this.strSport = strSport;
        this.strCountry = strCountry;
        this.idLeague = idLeague;
        this.strAlternate = strAlternate;
        this.strYoutube = strYoutube;
        this.strWebsite = strWebsite;
        this.strBadge = strBadge;
        this.email = email;

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // toString
    @Override
    public String toString() {
        return "Favorite{" +
                "id=" + id +
                "League=" + strLeague +
                "Sport=" + strSport +
                "Country=" + strCountry +
                "League Id=" + idLeague +
                "Alternate=" + strAlternate +
                "Youtube Link=" + strYoutube +
                "Website=" + strWebsite +
                "Badge=" + strBadge +
                '}';
    }

    // equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Favorite favorite)) return false;
        return Objects.equals(id, favorite.id) &&
                Objects.equals(email, favorite.email) &&
                Objects.equals(strLeague, favorite.strLeague) &&
                Objects.equals(strSport, favorite.strSport) &&
                Objects.equals(strCountry, favorite.strCountry) &&
                Objects.equals(idLeague, favorite.idLeague) &&
                Objects.equals(strAlternate, favorite.strAlternate) &&
                Objects.equals(strYoutube, favorite.strYoutube) &&
                Objects.equals(strWebsite, favorite.strWebsite) &&
                Objects.equals(strBadge, favorite.strBadge);
    }

    public String getStrLeague() {
        return strLeague;
    }

    public void setStrLeague(String strLeague) {
        this.strLeague = strLeague;
    }

    public String getStrSport() {
        return strSport;
    }

    public void setStrSport(String strSport) {
        this.strSport = strSport;
    }

    public String getStrCountry() {
        return strCountry;
    }

    public void setStrCountry(String strCountry) {
        this.strCountry = strCountry;
    }

    public int getIdLeague() {
        return idLeague;
    }

    public void setIdLeague(int idLeague) {
        this.idLeague = idLeague;
    }

    public String getStrAlternate() {
        return strAlternate;
    }

    public void setStrAlternate(String strAlternate) {
        this.strAlternate = strAlternate;
    }

    public String getStrYoutube() {
        return strYoutube;
    }

    public void setStrYoutube(String strYoutube) {
        this.strYoutube = strYoutube;
    }

    public String getStrWebsite() {
        return strWebsite;
    }

    public void setStrWebsite(String strWebsite) {
        this.strWebsite = strWebsite;
    }

    public String getStrBadge() {
        return strBadge;
    }

    public void setStrBadge(String strBadge) {
        this.strBadge = strBadge;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }
}
