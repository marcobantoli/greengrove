package com.example.restservice.userreward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserRewardService {

    private final UserRewardRepository userRewardRepository;

    @Autowired
    public UserRewardService(UserRewardRepository userRewardRepository) {
        this.userRewardRepository = userRewardRepository;
    }

    public List<UserReward> getAllUserRewards() {
        return userRewardRepository.findAll();
    }

    public UserReward getUserRewardById(UUID id) {
        return userRewardRepository.findById(id).orElse(null);
    }

    public UserReward createUserReward(UserReward userReward) {
        return userRewardRepository.save(userReward);
    }

    public UserReward updateUserReward(UUID id, UserReward userRewardDetails) {
        return userRewardRepository.findById(id)
                .map(userReward -> {
                    userReward.setUser(userRewardDetails.getUser());
                    userReward.setReward(userRewardDetails.getReward());
                    return userRewardRepository.save(userReward);
                })
                .orElse(null);
    }

    public void deleteUserReward(UUID id) {
        userRewardRepository.deleteById(id);
    }
}
