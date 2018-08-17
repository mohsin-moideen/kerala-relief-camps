package com.camps.relief.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of CampSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CampSearchRepositoryMockConfiguration {

    @MockBean
    private CampSearchRepository mockCampSearchRepository;

}
