package com.example.restservice.communitymember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommunityMemberService {

    private final CommunityMemberRepository communityMemberRepository;

    @Autowired
    public CommunityMemberService(CommunityMemberRepository communityMemberRepository) {
        this.communityMemberRepository = communityMemberRepository;
    }

    public List<CommunityMember> getAllCommunityMembers() {
        return communityMemberRepository.findAll();
    }

    public CommunityMember getCommunityMemberById(UUID id) {
        return communityMemberRepository.findById(id).orElse(null);
    }

    public CommunityMember createCommunityMember(CommunityMember communityMember) {
        return communityMemberRepository.save(communityMember);
    }

    public CommunityMember updateCommunityMember(UUID id, CommunityMember communityMemberDetails) {
        return communityMemberRepository.findById(id)
                .map(communityMember -> {
                    communityMember.setUser(communityMemberDetails.getUser());
                    communityMember.setCommunity(communityMemberDetails.getCommunity());
                    return communityMemberRepository.save(communityMember);
                })
                .orElse(null);
    }

    public void deleteCommunityMember(UUID id) {
        communityMemberRepository.deleteById(id);
    }
}
