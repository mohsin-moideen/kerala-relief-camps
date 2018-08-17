package com.camps.relief.repository;

import com.camps.relief.domain.Camp;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Camp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampRepository extends JpaRepository<Camp, Long> {

}
