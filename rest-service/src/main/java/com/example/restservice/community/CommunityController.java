package com.example.restservice.community;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/communities")
public class CommunityController {

    private final CommunityService communityService;

    @Autowired
    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @GetMapping
    public List<Community> getAllCommunities() {
        return communityService.getAllCommunities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getCommunityById(@PathVariable UUID id) {
        Community community = communityService.getCommunityById(id);
        return community != null ? ResponseEntity.ok(community) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Community createCommunity(@RequestBody Community community) {
        return communityService.createCommunity(community);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Community> updateCommunity(@PathVariable UUID id, @RequestBody Community communityDetails) {
        Community updatedCommunity = communityService.updateCommunity(id, communityDetails);
        return updatedCommunity != null ? ResponseEntity.ok(updatedCommunity) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable UUID id) {
        communityService.deleteCommunity(id);
        return ResponseEntity.noContent().build();
    }
}
