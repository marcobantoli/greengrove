package com.example.restservice.communitymember;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, UUID> {
    // Additional query methods can be defined here if needed
}
