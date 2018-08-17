package com.camps.relief.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.camps.relief.domain.Camp;
import com.camps.relief.service.CampService;
import com.camps.relief.web.rest.errors.BadRequestAlertException;
import com.camps.relief.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Camp.
 */
@RestController
@RequestMapping("/api")
public class CampResource {

    private final Logger log = LoggerFactory.getLogger(CampResource.class);

    private static final String ENTITY_NAME = "camp";

    private final CampService campService;

    public CampResource(CampService campService) {
        this.campService = campService;
    }

    /**
     * POST  /camps : Create a new camp.
     *
     * @param camp the camp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new camp, or with status 400 (Bad Request) if the camp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/camps")
    @Timed
    public ResponseEntity<Camp> createCamp(@RequestBody Camp camp) throws URISyntaxException {
        log.debug("REST request to save Camp : {}", camp);
        if (camp.getId() != null) {
            throw new BadRequestAlertException("A new camp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Camp result = campService.save(camp);
        return ResponseEntity.created(new URI("/api/camps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /camps : Updates an existing camp.
     *
     * @param camp the camp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated camp,
     * or with status 400 (Bad Request) if the camp is not valid,
     * or with status 500 (Internal Server Error) if the camp couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/camps")
    @Timed
    public ResponseEntity<Camp> updateCamp(@RequestBody Camp camp) throws URISyntaxException {
        log.debug("REST request to update Camp : {}", camp);
        if (camp.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Camp result = campService.save(camp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, camp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /camps : get all the camps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of camps in body
     */
    @GetMapping("/camps")
    @Timed
    public List<Camp> getAllCamps() {
        log.debug("REST request to get all Camps");
        return campService.findAll();
    }

    /**
     * GET  /camps/:id : get the "id" camp.
     *
     * @param id the id of the camp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the camp, or with status 404 (Not Found)
     */
    @GetMapping("/camps/{id}")
    @Timed
    public ResponseEntity<Camp> getCamp(@PathVariable Long id) {
        log.debug("REST request to get Camp : {}", id);
        Optional<Camp> camp = campService.findOne(id);
        return ResponseUtil.wrapOrNotFound(camp);
    }

    /**
     * DELETE  /camps/:id : delete the "id" camp.
     *
     * @param id the id of the camp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/camps/{id}")
    @Timed
    public ResponseEntity<Void> deleteCamp(@PathVariable Long id) {
        log.debug("REST request to delete Camp : {}", id);
        campService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/camps?query=:query : search for the camp corresponding
     * to the query.
     *
     * @param query the query of the camp search
     * @return the result of the search
     */
    @GetMapping("/_search/camps")
    @Timed
    public List<Camp> searchCamps(@RequestParam String query) {
        log.debug("REST request to search Camps for query {}", query);
        return campService.search(query);
    }

}
