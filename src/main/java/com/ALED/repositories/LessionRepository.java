package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Lession;
import com.ALED.entities.Users;


@Repository
public interface LessionRepository extends JpaRepository<Lession, Integer> {
	
	@Query(value = "SELECT * FROM lession WHERE link_video LIKE CONCAT('%',:namevideo,'%')" ,nativeQuery = true)
	Lession findbylinkvideo(@Param("namevideo") String namevideo  );
	
	@Query(value = "SELECT * FROM lession l WHERE l.section_id = ?1", nativeQuery = true)
	List<Lession> findAllBySection(Integer sectionId);

	@Query(value = "SELECT * FROM lession l WHERE l.status = 1", nativeQuery = true)
	List<Lession> findAllActive();

	 
    @Query(value = "SELECT * FROM lession WHERE id=:id", nativeQuery = true)
	Lession findByyid(@Param("id") Integer id);
}
