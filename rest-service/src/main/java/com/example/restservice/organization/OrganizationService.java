package com.example.restservice.organization;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }

    public Organization getOrganizationById(UUID organizationId) {
        return organizationRepository.findById(organizationId).orElse(null);
    }

    public Organization createOrganization(Organization organization) {
        // Set createdAt and updatedAt timestamps
        organization.setCreatedAt(new java.util.Date());
        organization.setUpdatedAt(new java.util.Date());
        return organizationRepository.save(organization);
    }

    public Organization updateOrganization(UUID organizationId, Organization organizationDetails) {
        return organizationRepository.findById(organizationId)
                .map(organization -> {
                    organization.setName(organizationDetails.getName());
                    organization.setDescription(organizationDetails.getDescription());
                    organization.setWebsite(organizationDetails.getWebsite());
                    organization.setEmail(organizationDetails.getEmail());
                    organization.setPhone(organizationDetails.getPhone());
                    organization.setAddress(organizationDetails.getAddress());
                    // Update the updatedAt timestamp
                    organization.setUpdatedAt(new java.util.Date());
                    return organizationRepository.save(organization);
                })
                .orElse(null);
    }

    public void deleteOrganization(UUID organizationId) {
        organizationRepository.deleteById(organizationId);
    }
}
