package com.camps.relief.repository.search;

import com.camps.relief.domain.Camp;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Camp entity.
 */
public interface CampSearchRepository extends ElasticsearchRepository<Camp, Long> {
}
