package com.example.league_service.service;

import com.example.league_service.dto.LeagueDto;
import com.example.league_service.dto.TheSportsDbLeaguesResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Service
public class LeagueService {

    private final RestTemplate restTemplate;
    private final String sportsDbBaseUrl;

    public LeagueService(RestTemplate restTemplate,
                         @Value("${sportsdb.base-url}") String sportsDbBaseUrl) {
        this.restTemplate = restTemplate;
        this.sportsDbBaseUrl = sportsDbBaseUrl;
    }

    /**
     * Fetch leagues by country from TheSportsDB.
     * Results cached per country to speed repeat calls.
     */
    @Cacheable(value = "leaguesByCountry", key = "#country.toLowerCase()")
    public List<LeagueDto> getLeaguesByCountry(String country) {
        if (country == null || country.isBlank()) {
            return Collections.emptyList();
        }

        String url = sportsDbBaseUrl + encodeCountry(country);

        ResponseEntity<TheSportsDbLeaguesResponse> resp =
                restTemplate.getForEntity(url, TheSportsDbLeaguesResponse.class);

        TheSportsDbLeaguesResponse body = resp.getBody();
        if (body == null) return Collections.emptyList();

        List<LeagueDto> leagues = body.getLeaguesList();
        return leagues == null ? Collections.emptyList() : leagues;
    }

    private String encodeCountry(String country) {
        // simple encoding; RestTemplate will encode if using URI builder; keep simple
        return country.replace(" ", "%20");
    }
}
