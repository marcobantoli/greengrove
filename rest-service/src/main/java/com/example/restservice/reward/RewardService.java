package com.example.restservice.reward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RewardService {

    private final RewardRepository rewardRepository;

    @Autowired
    public RewardService(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }

    public List<Reward> getAllRewards() {
        return rewardRepository.findAll();
    }

    public Reward getRewardById(UUID id) {
        return rewardRepository.findById(id).orElse(null);
    }

    public Reward createReward(Reward reward) {
        return rewardRepository.save(reward);
    }

    public Reward updateReward(UUID id, Reward rewardDetails) {
        return rewardRepository.findById(id)
                .map(reward -> {
                    reward.setName(rewardDetails.getName());
                    reward.setDescription(rewardDetails.getDescription());
                    reward.setPointsRequired(rewardDetails.getPointsRequired());
                    return rewardRepository.save(reward);
                })
                .orElse(null);
    }

    public void deleteReward(UUID id) {
        rewardRepository.deleteById(id);
    }
}
