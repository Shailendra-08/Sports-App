    package com.example.UserProfile.controller;


    import com.example.UserProfile.Service.ProfileServices;
    import com.example.UserProfile.dto.AuthRegisterRequest;
    import com.example.UserProfile.dto.JwtResponse;
    import com.example.UserProfile.dto.RegisterRequest;
    import com.example.UserProfile.entity.UserProfile;
    import com.example.UserProfile.kafka.KafkaProducerConfig;
    import org.springframework.beans.factory.annotation.Value;
    import com.example.UserProfile.repository.UserProfileRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.client.RestTemplate;

    import java.util.Map;

    @RestController
    @RequestMapping("/api/user")
    public class UserProfileController {
        @Autowired
        private RestTemplate restTemplate;

        @Value("${auth.service.url}")
        private String authServiceUrl;
        @Autowired
        private UserProfileRepository repo;

        @Autowired
        private KafkaProducerConfig kafkaProducer;

        @Autowired
        private ProfileServices userService;

        @PostMapping("/register")
        public ResponseEntity<?> register(@RequestBody RegisterRequest req){
            if(req.getFullName() == null || req.getEmail() == null || req.getPassword() == null){
                return ResponseEntity.badRequest().body("fullName, email and password required");
            }
            if(repo.findByEmail(req.getEmail()).isPresent()){
                return ResponseEntity.status(409).body("Email already registered");
            }

            UserProfile up = new UserProfile();
            up.setFullName(req.getFullName());
            up.setEmail(req.getEmail());
            up.setAge(req.getAge());
            up.setBio(req.getBio());
            repo.save(up);

            // publish credentials to kafka (plain password — will be hashed by auth-service)
            // Send credentials to Auth service (and get token back)
            AuthRegisterRequest authReq = new AuthRegisterRequest(req.getEmail(), req.getPassword());
            ResponseEntity<JwtResponse> authResp =
                    restTemplate.postForEntity(authServiceUrl, authReq, JwtResponse.class);

            // Also publish to Kafka (if you still want async eventing)
            kafkaProducer.sendCredentials(req.getEmail(), req.getPassword());

            // Return JWT as response
            return ResponseEntity.status(201).body(authResp.getBody());
        }

        @GetMapping("getUser/{email}")
        public UserProfile getUserById(@PathVariable String email) {
            return userService.getUserById(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        @PatchMapping("/update/{email}")
        public ResponseEntity<UserProfile> updateUserPartial(
                @PathVariable String email,
                @RequestBody Map<String, Object> updates
        ) {
            UserProfile updatedUser = userService.updateUser(email, updates);
            return ResponseEntity.ok(updatedUser);
        }
    }
