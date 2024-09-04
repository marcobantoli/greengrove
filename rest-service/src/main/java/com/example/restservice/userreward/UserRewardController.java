package com.example.restservice.userreward;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.example.restservice.user.User;

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

    @GetMapping("/{id}")
    public ResponseEntity<UserReward> getUserRewardById(@PathVariable UUID id) {
        UserReward userReward = userRewardService.getUserRewardById(id);
        return userReward != null ? ResponseEntity.ok(userReward) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<UserReward> getUserRewardsForAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        UUID authenticatedUserId = null;

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User userDetails = (User) authentication.getPrincipal();
            authenticatedUserId = userDetails.getUserId();
        }
        
        User user = new User();
        user.setUserId(authenticatedUserId);

        // Fetch all user rewards for the authenticated user
        return userRewardService.getUserRewardsByUser(user);
    }

    @PostMapping("/redeem/{rewardId}")
    public UserReward redeemReward(@PathVariable UUID rewardId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        UUID authenticatedUserId = null;

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User userDetails = (User) authentication.getPrincipal();
            authenticatedUserId = userDetails.getUserId();
        }
        
        User user = new User();
        user.setUserId(authenticatedUserId);

        // Redeem the reward for the authenticated user
        return userRewardService.redeemReward(user, rewardId);
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
