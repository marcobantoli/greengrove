package com.example.restservice.community;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommunityService {

    private final CommunityRepository communityRepository;

    @Autowired
    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    public Community getCommunityById(UUID id) {
        return communityRepository.findById(id).orElse(null);
    }

    public Community createCommunity(Community community) {
        return communityRepository.save(community);
    }

    public Community updateCommunity(UUID id, Community communityDetails) {
        return communityRepository.findById(id)
                .map(community -> {
                    community.setName(communityDetails.getName());
                    community.setDescription(communityDetails.getDescription());
                    return communityRepository.save(community);
                })
                .orElse(null);
    }

    public void deleteCommunity(UUID id) {
        communityRepository.deleteById(id);
    }
}
