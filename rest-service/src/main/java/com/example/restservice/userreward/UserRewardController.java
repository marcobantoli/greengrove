package com.example.restservice.userreward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user-rewards")
public class UserRewardController {

    private final UserRewardService userRewardService;

    @Autowired
    public UserRewardController(UserRewardService userRewardService) {
        this.userRewardService = userRewardService;
    }

    @GetMapping
    public List<UserReward> getAllUserRewards() {
        return userRewardService.getAllUserRewards();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserReward> getUserRewardById(@PathVariable UUID id) {
        UserReward userReward = userRewardService.getUserRewardById(id);
        return userReward != null ? ResponseEntity.ok(userReward) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<UserReward> createUserReward(@RequestBody UserReward userReward) {
        UserReward createdUserReward = userRewardService.createUserReward(userReward);
        return ResponseEntity.ok(createdUserReward);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserReward> updateUserReward(@PathVariable UUID id, @RequestBody UserReward userRewardDetails) {
        UserReward updatedUserReward = userRewardService.updateUserReward(id, userRewardDetails);
        return updatedUserReward != null ? ResponseEntity.ok(updatedUserReward) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserReward(@PathVariable UUID id) {
        userRewardService.deleteUserReward(id);
        return ResponseEntity.noContent().build();
    }
}
