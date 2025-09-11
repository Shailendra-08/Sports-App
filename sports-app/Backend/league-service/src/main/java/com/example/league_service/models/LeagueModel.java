package com.example.league_service.models;

public class LeagueModel {

    private String strLeague;
    private String strSport;
    private String strCountry;
    private int idLeague;
    private String strAlternate;
    private String strYoutube;
    private String strWebsite;
    private String strBadge;


    LeagueModel(String strLeague, String strSport, String strCountry, int idLeague, String strAlternate, String strYoutube, String strWebsite, String strBadge){
        this.strLeague = strLeague;
        this.strSport = strSport;
        this.strCountry = strCountry;
        this.idLeague = idLeague;
        this.strAlternate = strAlternate;
        this.strYoutube = strYoutube;
        this.strWebsite = strWebsite;
        this.strBadge = strBadge;
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
}
