package com.example.restservice.reward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    private final RewardService rewardService;

    @Autowired
    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    @GetMapping
    public List<Reward> getAllRewards() {
        return rewardService.getAllRewards();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reward> getRewardById(@PathVariable UUID id) {
        Reward reward = rewardService.getRewardById(id);
        return reward != null ? ResponseEntity.ok(reward) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Reward createReward(@RequestBody Reward reward) {
        return rewardService.createReward(reward);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reward> updateReward(@PathVariable UUID id, @RequestBody Reward rewardDetails) {
        Reward updatedReward = rewardService.updateReward(id, rewardDetails);
        return updatedReward != null ? ResponseEntity.ok(updatedReward) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable UUID id) {
        rewardService.deleteReward(id);
        return ResponseEntity.noContent().build();
    }
}
