package com.camps.relief.web.rest;

import com.camps.relief.KeralaReliefCampsApp;

import com.camps.relief.domain.Requirement;
import com.camps.relief.repository.RequirementRepository;
import com.camps.relief.repository.search.RequirementSearchRepository;
import com.camps.relief.service.RequirementService;
import com.camps.relief.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.camps.relief.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RequirementResource REST controller.
 *
 * @see RequirementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KeralaReliefCampsApp.class)
public class RequirementResourceIntTest {

    private static final String DEFAULT_ITEM = "AAAAAAAAAA";
    private static final String UPDATED_ITEM = "BBBBBBBBBB";

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    @Autowired
    private RequirementRepository requirementRepository;

    

    @Autowired
    private RequirementService requirementService;

    /**
     * This repository is mocked in the com.camps.relief.repository.search test package.
     *
     * @see com.camps.relief.repository.search.RequirementSearchRepositoryMockConfiguration
     */
    @Autowired
    private RequirementSearchRepository mockRequirementSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRequirementMockMvc;

    private Requirement requirement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RequirementResource requirementResource = new RequirementResource(requirementService);
        this.restRequirementMockMvc = MockMvcBuilders.standaloneSetup(requirementResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Requirement createEntity(EntityManager em) {
        Requirement requirement = new Requirement()
            .item(DEFAULT_ITEM)
            .quantity(DEFAULT_QUANTITY);
        return requirement;
    }

    @Before
    public void initTest() {
        requirement = createEntity(em);
    }

    @Test
    @Transactional
    public void createRequirement() throws Exception {
        int databaseSizeBeforeCreate = requirementRepository.findAll().size();

        // Create the Requirement
        restRequirementMockMvc.perform(post("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirement)))
            .andExpect(status().isCreated());

        // Validate the Requirement in the database
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeCreate + 1);
        Requirement testRequirement = requirementList.get(requirementList.size() - 1);
        assertThat(testRequirement.getItem()).isEqualTo(DEFAULT_ITEM);
        assertThat(testRequirement.getQuantity()).isEqualTo(DEFAULT_QUANTITY);

        // Validate the Requirement in Elasticsearch
        verify(mockRequirementSearchRepository, times(1)).save(testRequirement);
    }

    @Test
    @Transactional
    public void createRequirementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = requirementRepository.findAll().size();

        // Create the Requirement with an existing ID
        requirement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRequirementMockMvc.perform(post("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirement)))
            .andExpect(status().isBadRequest());

        // Validate the Requirement in the database
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeCreate);

        // Validate the Requirement in Elasticsearch
        verify(mockRequirementSearchRepository, times(0)).save(requirement);
    }

    @Test
    @Transactional
    public void getAllRequirements() throws Exception {
        // Initialize the database
        requirementRepository.saveAndFlush(requirement);

        // Get all the requirementList
        restRequirementMockMvc.perform(get("/api/requirements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requirement.getId().intValue())))
            .andExpect(jsonPath("$.[*].item").value(hasItem(DEFAULT_ITEM.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }
    

    @Test
    @Transactional
    public void getRequirement() throws Exception {
        // Initialize the database
        requirementRepository.saveAndFlush(requirement);

        // Get the requirement
        restRequirementMockMvc.perform(get("/api/requirements/{id}", requirement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(requirement.getId().intValue()))
            .andExpect(jsonPath("$.item").value(DEFAULT_ITEM.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingRequirement() throws Exception {
        // Get the requirement
        restRequirementMockMvc.perform(get("/api/requirements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRequirement() throws Exception {
        // Initialize the database
        requirementService.save(requirement);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockRequirementSearchRepository);

        int databaseSizeBeforeUpdate = requirementRepository.findAll().size();

        // Update the requirement
        Requirement updatedRequirement = requirementRepository.findById(requirement.getId()).get();
        // Disconnect from session so that the updates on updatedRequirement are not directly saved in db
        em.detach(updatedRequirement);
        updatedRequirement
            .item(UPDATED_ITEM)
            .quantity(UPDATED_QUANTITY);

        restRequirementMockMvc.perform(put("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRequirement)))
            .andExpect(status().isOk());

        // Validate the Requirement in the database
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeUpdate);
        Requirement testRequirement = requirementList.get(requirementList.size() - 1);
        assertThat(testRequirement.getItem()).isEqualTo(UPDATED_ITEM);
        assertThat(testRequirement.getQuantity()).isEqualTo(UPDATED_QUANTITY);

        // Validate the Requirement in Elasticsearch
        verify(mockRequirementSearchRepository, times(1)).save(testRequirement);
    }

    @Test
    @Transactional
    public void updateNonExistingRequirement() throws Exception {
        int databaseSizeBeforeUpdate = requirementRepository.findAll().size();

        // Create the Requirement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restRequirementMockMvc.perform(put("/api/requirements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(requirement)))
            .andExpect(status().isBadRequest());

        // Validate the Requirement in the database
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Requirement in Elasticsearch
        verify(mockRequirementSearchRepository, times(0)).save(requirement);
    }

    @Test
    @Transactional
    public void deleteRequirement() throws Exception {
        // Initialize the database
        requirementService.save(requirement);

        int databaseSizeBeforeDelete = requirementRepository.findAll().size();

        // Get the requirement
        restRequirementMockMvc.perform(delete("/api/requirements/{id}", requirement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Requirement> requirementList = requirementRepository.findAll();
        assertThat(requirementList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Requirement in Elasticsearch
        verify(mockRequirementSearchRepository, times(1)).deleteById(requirement.getId());
    }

    @Test
    @Transactional
    public void searchRequirement() throws Exception {
        // Initialize the database
        requirementService.save(requirement);
        when(mockRequirementSearchRepository.search(queryStringQuery("id:" + requirement.getId())))
            .thenReturn(Collections.singletonList(requirement));
        // Search the requirement
        restRequirementMockMvc.perform(get("/api/_search/requirements?query=id:" + requirement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(requirement.getId().intValue())))
            .andExpect(jsonPath("$.[*].item").value(hasItem(DEFAULT_ITEM.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Requirement.class);
        Requirement requirement1 = new Requirement();
        requirement1.setId(1L);
        Requirement requirement2 = new Requirement();
        requirement2.setId(requirement1.getId());
        assertThat(requirement1).isEqualTo(requirement2);
        requirement2.setId(2L);
        assertThat(requirement1).isNotEqualTo(requirement2);
        requirement1.setId(null);
        assertThat(requirement1).isNotEqualTo(requirement2);
    }
}
