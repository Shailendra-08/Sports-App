package com.example.league_service.dto;

//
//import java.util.List;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import lombok.Data;
//
//@Data
//public class TheSportsDbLeaguesResponse {
//    @JsonProperty("countrys")      // sometimes the API uses "countrys" or "leagues"; test with actual response
//    private List<LeagueDto> countrys;
//
//    @JsonProperty("leagues")
//    private List<LeagueDto> leagues;
//
//    // convenient getter
//    public List<LeagueDto> getLeaguesList() {
//        if (leagues != null) return leagues;
//        return countrys;
//    }
//}



import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TheSportsDbLeaguesResponse {

    @JsonProperty("countries")  // exact match from API response
    private List<LeagueDto> countries;

    public List<LeagueDto> getLeaguesList() {
        return countries;
    }
}
