package com.example.league_service.controller;


import com.example.league_service.dto.LeagueDto;
import com.example.league_service.service.LeagueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class LeagueController {

    private final LeagueService service;

    public LeagueController(LeagueService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<LeagueDto>> getLeaguesByCountry(@RequestParam("country") String country) {
        List<LeagueDto> leagues = service.getLeaguesByCountry(country);
        return ResponseEntity.ok(leagues);
    }
}
