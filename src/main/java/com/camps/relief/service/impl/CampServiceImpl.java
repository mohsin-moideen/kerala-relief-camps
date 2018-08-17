package com.camps.relief.service.impl;

import com.camps.relief.service.CampService;
import com.camps.relief.domain.Camp;
import com.camps.relief.repository.CampRepository;
import com.camps.relief.repository.search.CampSearchRepository;
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
 * Service Implementation for managing Camp.
 */
@Service
@Transactional
public class CampServiceImpl implements CampService {

    private final Logger log = LoggerFactory.getLogger(CampServiceImpl.class);

    private final CampRepository campRepository;

    private final CampSearchRepository campSearchRepository;

    public CampServiceImpl(CampRepository campRepository, CampSearchRepository campSearchRepository) {
        this.campRepository = campRepository;
        this.campSearchRepository = campSearchRepository;
    }

    /**
     * Save a camp.
     *
     * @param camp the entity to save
     * @return the persisted entity
     */
    @Override
    public Camp save(Camp camp) {
        log.debug("Request to save Camp : {}", camp);        Camp result = campRepository.save(camp);
        campSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the camps.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Camp> findAll() {
        log.debug("Request to get all Camps");
        return campRepository.findAll();
    }


    /**
     * Get one camp by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Camp> findOne(Long id) {
        log.debug("Request to get Camp : {}", id);
        return campRepository.findById(id);
    }

    /**
     * Delete the camp by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Camp : {}", id);
        campRepository.deleteById(id);
        campSearchRepository.deleteById(id);
    }

    /**
     * Search for the camp corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Camp> search(String query) {
        log.debug("Request to search Camps for query {}", query);
        return StreamSupport
            .stream(campSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
