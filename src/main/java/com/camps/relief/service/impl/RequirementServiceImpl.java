package com.camps.relief.service.impl;

import com.camps.relief.service.RequirementService;
import com.camps.relief.domain.Requirement;
import com.camps.relief.repository.RequirementRepository;
import com.camps.relief.repository.search.RequirementSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Requirement.
 */
@Service
@Transactional
public class RequirementServiceImpl implements RequirementService {

    private final Logger log = LoggerFactory.getLogger(RequirementServiceImpl.class);

    private final RequirementRepository requirementRepository;

    private final RequirementSearchRepository requirementSearchRepository;

    public RequirementServiceImpl(RequirementRepository requirementRepository, RequirementSearchRepository requirementSearchRepository) {
        this.requirementRepository = requirementRepository;
        this.requirementSearchRepository = requirementSearchRepository;
    }

    /**
     * Save a requirement.
     *
     * @param requirement the entity to save
     * @return the persisted entity
     */
    @Override
    public Requirement save(Requirement requirement) {
        log.debug("Request to save Requirement : {}", requirement);        Requirement result = requirementRepository.save(requirement);
        requirementSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the requirements.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Requirement> findAll() {
        log.debug("Request to get all Requirements");
        return requirementRepository.findAll();
    }


    /**
     * Get one requirement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Requirement> findOne(Long id) {
        log.debug("Request to get Requirement : {}", id);
        return requirementRepository.findById(id);
    }

    /**
     * Delete the requirement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Requirement : {}", id);
        requirementRepository.deleteById(id);
        requirementSearchRepository.deleteById(id);
    }

    /**
     * Search for the requirement corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Requirement> search(String query) {
        log.debug("Request to search Requirements for query {}", query);
        return StreamSupport
            .stream(requirementSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
