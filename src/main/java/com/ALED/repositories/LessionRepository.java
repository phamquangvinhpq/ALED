package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Lession;

@Repository
public interface LessionRepository extends JpaRepository<Lession, Integer> {

	@Query(value = "SELECT * FROM lession WHERE link_video LIKE CONCAT('%',:namevideo,'%')", nativeQuery = true)
	Lession findbylinkvideo(@Param("namevideo") String namevideo);

	@Query(value = "SELECT * FROM lession l WHERE l.section_id = ?1", nativeQuery = true)
	List<Lession> findAllBySection(Integer sectionId);

	@Query(value = "SELECT * FROM lession l WHERE l.status = 1", nativeQuery = true)
	List<Lession> findAllActive();

	@Query(value = "SELECT * FROM lession WHERE id=:id", nativeQuery = true)
	Lession findByyid(@Param("id") Integer id);

    @Query(value = "SELECT  * FROM `lession` JOIN section ON lession.section_id=section.id WHERE section.course_id =:course\r\n"
    		+ "ORDER BY time DESC LIMIT 1", nativeQuery = true)
   	Lession findBytime(@Param("course") Integer course);

	
	@Query(value = "SELECT * FROM lession WHERE section_id = ?1 ", nativeQuery = true)
	List<Lession> findBySectionId(Integer section_id);

}
