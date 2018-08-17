package com.camps.relief.service;

import com.camps.relief.domain.Camp;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Camp.
 */
public interface CampService {

    /**
     * Save a camp.
     *
     * @param camp the entity to save
     * @return the persisted entity
     */
    Camp save(Camp camp);

    /**
     * Get all the camps.
     *
     * @return the list of entities
     */
    List<Camp> findAll();


    /**
     * Get the "id" camp.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Camp> findOne(Long id);

    /**
     * Delete the "id" camp.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the camp corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Camp> search(String query);
}
