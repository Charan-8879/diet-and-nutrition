package com.healthify.service;

import com.healthify.dto.ProfileDTO;
import com.healthify.entity.User;
import com.healthify.entity.UserProfile;
import com.healthify.repository.UserProfileRepository;
import com.healthify.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ProfileService {

    private final UserProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(UserProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public ProfileDTO getProfile(String email) {
        if (email == null) return new ProfileDTO();
        return profileRepository.findByUserEmail(email.trim().toLowerCase())
                .map(this::toDTO)
                .orElse(new ProfileDTO());
    }

    @Transactional
    public ProfileDTO saveOrUpdateProfile(ProfileDTO dto) {
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required for profile");
        }
        String email = dto.getEmail().trim().toLowerCase();
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User("Athlete", email, "", "");
            return userRepository.save(newUser);
        });

        UserProfile profile = profileRepository.findByUser(user).orElseGet(() -> {
            UserProfile p = new UserProfile();
            p.setUser(user);
            return p;
        });

        profile.setGender(dto.getGender());
        profile.setAge(dto.getAge());
        profile.setWeight(dto.getWeight());
        profile.setHeight(dto.getHeight());
        profile.setActivity(dto.getActivity());
        profile.setBmr(dto.getBmr());
        profile.setTdee(dto.getTdee());
        if (dto.getSelectedGoal() != null) {
            profile.setSelectedGoal(dto.getSelectedGoal());
        }
        if (dto.getTargetCalories() != null) {
            profile.setTargetCalories(dto.getTargetCalories());
        }

        UserProfile saved = profileRepository.save(profile);
        return toDTO(saved);
    }

    private ProfileDTO toDTO(UserProfile profile) {
        ProfileDTO dto = new ProfileDTO();
        if (profile.getUser() != null) {
            dto.setEmail(profile.getUser().getEmail());
        }
        dto.setGender(profile.getGender());
        dto.setAge(profile.getAge());
        dto.setWeight(profile.getWeight());
        dto.setHeight(profile.getHeight());
        dto.setActivity(profile.getActivity());
        dto.setBmr(profile.getBmr());
        dto.setTdee(profile.getTdee());
        dto.setSelectedGoal(profile.getSelectedGoal());
        dto.setTargetCalories(profile.getTargetCalories());
        if (profile.getUpdatedAt() != null) {
            dto.setUpdatedAt(profile.getUpdatedAt().toString());
        }
        return dto;
    }
}
