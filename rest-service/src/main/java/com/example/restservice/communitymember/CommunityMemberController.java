package com.example.restservice.communitymember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/community-members")
public class CommunityMemberController {

    private final CommunityMemberService communityMemberService;

    @Autowired
    public CommunityMemberController(CommunityMemberService communityMemberService) {
        this.communityMemberService = communityMemberService;
    }

    @GetMapping
    public List<CommunityMember> getAllCommunityMembers() {
        return communityMemberService.getAllCommunityMembers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityMember> getCommunityMemberById(@PathVariable UUID id) {
        CommunityMember communityMember = communityMemberService.getCommunityMemberById(id);
        return communityMember != null ? ResponseEntity.ok(communityMember) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<CommunityMember> createCommunityMember(@RequestBody CommunityMember communityMember) {
        CommunityMember createdCommunityMember = communityMemberService.createCommunityMember(communityMember);
        return ResponseEntity.ok(createdCommunityMember);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommunityMember> updateCommunityMember(@PathVariable UUID id, @RequestBody CommunityMember communityMemberDetails) {
        CommunityMember updatedCommunityMember = communityMemberService.updateCommunityMember(id, communityMemberDetails);
        return updatedCommunityMember != null ? ResponseEntity.ok(updatedCommunityMember) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunityMember(@PathVariable UUID id) {
        communityMemberService.deleteCommunityMember(id);
        return ResponseEntity.noContent().build();
    }
}
