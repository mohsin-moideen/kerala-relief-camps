package com.camps.relief.service;

import com.camps.relief.domain.Requirement;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Requirement.
 */
public interface RequirementService {

    /**
     * Save a requirement.
     *
     * @param requirement the entity to save
     * @return the persisted entity
     */
    Requirement save(Requirement requirement);

    /**
     * Get all the requirements.
     *
     * @return the list of entities
     */
    List<Requirement> findAll();


    /**
     * Get the "id" requirement.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Requirement> findOne(Long id);

    /**
     * Delete the "id" requirement.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the requirement corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Requirement> search(String query);
}
