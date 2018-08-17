package com.camps.relief.web.rest;

import com.camps.relief.KeralaReliefCampsApp;

import com.camps.relief.domain.Camp;
import com.camps.relief.repository.CampRepository;
import com.camps.relief.repository.search.CampSearchRepository;
import com.camps.relief.service.CampService;
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
 * Test class for the CampResource REST controller.
 *
 * @see CampResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KeralaReliefCampsApp.class)
public class CampResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private CampRepository campRepository;

    

    @Autowired
    private CampService campService;

    /**
     * This repository is mocked in the com.camps.relief.repository.search test package.
     *
     * @see com.camps.relief.repository.search.CampSearchRepositoryMockConfiguration
     */
    @Autowired
    private CampSearchRepository mockCampSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampMockMvc;

    private Camp camp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampResource campResource = new CampResource(campService);
        this.restCampMockMvc = MockMvcBuilders.standaloneSetup(campResource)
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
    public static Camp createEntity(EntityManager em) {
        Camp camp = new Camp()
            .name(DEFAULT_NAME)
            .phone(DEFAULT_PHONE);
        return camp;
    }

    @Before
    public void initTest() {
        camp = createEntity(em);
    }

    @Test
    @Transactional
    public void createCamp() throws Exception {
        int databaseSizeBeforeCreate = campRepository.findAll().size();

        // Create the Camp
        restCampMockMvc.perform(post("/api/camps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camp)))
            .andExpect(status().isCreated());

        // Validate the Camp in the database
        List<Camp> campList = campRepository.findAll();
        assertThat(campList).hasSize(databaseSizeBeforeCreate + 1);
        Camp testCamp = campList.get(campList.size() - 1);
        assertThat(testCamp.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCamp.getPhone()).isEqualTo(DEFAULT_PHONE);

        // Validate the Camp in Elasticsearch
        verify(mockCampSearchRepository, times(1)).save(testCamp);
    }

    @Test
    @Transactional
    public void createCampWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campRepository.findAll().size();

        // Create the Camp with an existing ID
        camp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampMockMvc.perform(post("/api/camps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camp)))
            .andExpect(status().isBadRequest());

        // Validate the Camp in the database
        List<Camp> campList = campRepository.findAll();
        assertThat(campList).hasSize(databaseSizeBeforeCreate);

        // Validate the Camp in Elasticsearch
        verify(mockCampSearchRepository, times(0)).save(camp);
    }

    @Test
    @Transactional
    public void getAllCamps() throws Exception {
        // Initialize the database
        campRepository.saveAndFlush(camp);

        // Get all the campList
        restCampMockMvc.perform(get("/api/camps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(camp.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }
    

    @Test
    @Transactional
    public void getCamp() throws Exception {
        // Initialize the database
        campRepository.saveAndFlush(camp);

        // Get the camp
        restCampMockMvc.perform(get("/api/camps/{id}", camp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(camp.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCamp() throws Exception {
        // Get the camp
        restCampMockMvc.perform(get("/api/camps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCamp() throws Exception {
        // Initialize the database
        campService.save(camp);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockCampSearchRepository);

        int databaseSizeBeforeUpdate = campRepository.findAll().size();

        // Update the camp
        Camp updatedCamp = campRepository.findById(camp.getId()).get();
        // Disconnect from session so that the updates on updatedCamp are not directly saved in db
        em.detach(updatedCamp);
        updatedCamp
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE);

        restCampMockMvc.perform(put("/api/camps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCamp)))
            .andExpect(status().isOk());

        // Validate the Camp in the database
        List<Camp> campList = campRepository.findAll();
        assertThat(campList).hasSize(databaseSizeBeforeUpdate);
        Camp testCamp = campList.get(campList.size() - 1);
        assertThat(testCamp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCamp.getPhone()).isEqualTo(UPDATED_PHONE);

        // Validate the Camp in Elasticsearch
        verify(mockCampSearchRepository, times(1)).save(testCamp);
    }

    @Test
    @Transactional
    public void updateNonExistingCamp() throws Exception {
        int databaseSizeBeforeUpdate = campRepository.findAll().size();

        // Create the Camp

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCampMockMvc.perform(put("/api/camps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(camp)))
            .andExpect(status().isBadRequest());

        // Validate the Camp in the database
        List<Camp> campList = campRepository.findAll();
        assertThat(campList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Camp in Elasticsearch
        verify(mockCampSearchRepository, times(0)).save(camp);
    }

    @Test
    @Transactional
    public void deleteCamp() throws Exception {
        // Initialize the database
        campService.save(camp);

        int databaseSizeBeforeDelete = campRepository.findAll().size();

        // Get the camp
        restCampMockMvc.perform(delete("/api/camps/{id}", camp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Camp> campList = campRepository.findAll();
        assertThat(campList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Camp in Elasticsearch
        verify(mockCampSearchRepository, times(1)).deleteById(camp.getId());
    }

    @Test
    @Transactional
    public void searchCamp() throws Exception {
        // Initialize the database
        campService.save(camp);
        when(mockCampSearchRepository.search(queryStringQuery("id:" + camp.getId())))
            .thenReturn(Collections.singletonList(camp));
        // Search the camp
        restCampMockMvc.perform(get("/api/_search/camps?query=id:" + camp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(camp.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Camp.class);
        Camp camp1 = new Camp();
        camp1.setId(1L);
        Camp camp2 = new Camp();
        camp2.setId(camp1.getId());
        assertThat(camp1).isEqualTo(camp2);
        camp2.setId(2L);
        assertThat(camp1).isNotEqualTo(camp2);
        camp1.setId(null);
        assertThat(camp1).isNotEqualTo(camp2);
    }
}
