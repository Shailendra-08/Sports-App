package com.example.UserProfile.Service;

import com.example.UserProfile.entity.UserProfile;
import com.example.UserProfile.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProfileServices {

    private final UserProfileRepository userRepository;

    public ProfileServices(UserProfileRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Fetch all user profiles
    public List<UserProfile> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a user by email
    public Optional<UserProfile> getUserById(String email) {
        return userRepository.findByEmail(email);
    }

    // Update only specific fields of a user by email
    public UserProfile updateUser(String email, Map<String, Object> updates) {
        Optional<UserProfile> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }

        UserProfile user = optionalUser.get();

        updates.forEach((key, value) -> {
            Field field = ReflectionUtils.findField(UserProfile.class, key);
            if (field != null) {
                field.setAccessible(true);
                ReflectionUtils.setField(field, user, value);
            }
        });

        return userRepository.save(user);
    }
}
