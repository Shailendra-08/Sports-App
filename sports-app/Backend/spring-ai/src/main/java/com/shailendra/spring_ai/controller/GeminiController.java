package com.shailendra.spring_ai.controller;

//import com.shailendra.spring_ai.service.GeminiService;
//import org.springframework.web.bind.annotation.*;
//import reactor.core.publisher.Mono;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/gemini")
//public class GeminiController {
//
//    private final GeminiService geminiService;
//
//    public GeminiController(GeminiService geminiService) {
//        this.geminiService = geminiService;
//    }
//
////    @GetMapping ("/ask")
////    public Mono<Map<String, String>> ask(@RequestParam String prompt) {
////        return geminiService.getGeminiResponse(prompt)
////                .map(response -> Map.of("response", response));
////    }
//
//
//    @PostMapping("/ask")
//    public Mono<Map<String, String>> ask(@RequestBody Map<String, String> body) {
//        String prompt = body.get("prompt");
//        return geminiService.getGeminiResponse(prompt)
//                .map(response -> Map.of("response", response));
//    }
//
//}





import com.shailendra.spring_ai.service.GeminiService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/")
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/ask")
    public Mono<Map<String, String>> ask(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");  // get prompt from JSON body
        return geminiService.getGeminiResponse(prompt)
                .map(response -> Map.of("response", response));
    }
}
