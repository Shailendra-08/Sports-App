package com.example.league_service.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LeagueDto {
    @JsonProperty("idLeague")
    private String idLeague;

    @JsonProperty("strLeague")
    private String strLeague;

    @JsonProperty("strSport")
    private String strSport;

    @JsonProperty("strBadge")
    private String strBadge;

    @JsonProperty("strCountry")
    private String strCountry;

    @JsonProperty("strYoutube")
    private String strYoutube;

    @JsonProperty("strWebsite")
    private String strWebsite;
}
