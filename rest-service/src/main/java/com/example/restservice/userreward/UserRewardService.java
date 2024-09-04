package com.example.restservice.userreward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restservice.reward.Reward;
import com.example.restservice.reward.RewardService;
import com.example.restservice.user.User;

import java.util.List;
import java.util.UUID;

@Service
public class UserRewardService {

    private final UserRewardRepository userRewardRepository;
    private final RewardService rewardService;

    @Autowired
    public UserRewardService(UserRewardRepository userRewardRepository, RewardService rewardService) {
        this.userRewardRepository = userRewardRepository;
        this.rewardService = rewardService;
    }

    public List<UserReward> getAllUserRewards() {
        return userRewardRepository.findAll();
    }

    public UserReward getUserRewardById(UUID id) {
        return userRewardRepository.findById(id).orElse(null);
    }

    public List<UserReward> getUserRewardsByUser(User user) {
        return userRewardRepository.findByUser(user);
    }

    public UserReward redeemReward(User user, UUID rewardId) {
        // Fetch the reward by ID
        Reward reward = rewardService.getRewardById(rewardId);

        // Create a new UserReward
        UserReward userReward = new UserReward();
        userReward.setUser(user);
        userReward.setReward(reward);

        // Save the UserReward to the database
        return userRewardRepository.save(userReward);
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
