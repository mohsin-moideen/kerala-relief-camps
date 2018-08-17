package com.camps.relief.repository.search;

import com.camps.relief.domain.Requirement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Requirement entity.
 */
public interface RequirementSearchRepository extends ElasticsearchRepository<Requirement, Long> {
}
