package com.camps.relief.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of RequirementSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class RequirementSearchRepositoryMockConfiguration {

    @MockBean
    private RequirementSearchRepository mockRequirementSearchRepository;

}
