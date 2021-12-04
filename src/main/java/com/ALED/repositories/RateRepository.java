package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Rate;



@Repository
public interface RateRepository extends JpaRepository<Rate, Integer> {

//	 @Query(value = "SELECT * FROM section WHERE course_id =:id ",nativeQuery = true)
//	 List<Section> timcour(@Param("id") Integer id);
//	 
//		

	@Query(value = "SELECT * FROM rate WHERE course_id=:id", nativeQuery = true)
	List<Rate> findbymycourse(@Param("id") Integer id);
	
	@Query(value = "SELECT ROUND(AVG(rate),1) FROM rate WHERE course_id=:id", nativeQuery = true)
	String findbyavg(@Param("id") Integer id);
	
	@Query(value = "SELECT COUNT(rate) FROM rate WHERE course_id=:id", nativeQuery = true)
	String findcount(@Param("id") Integer id);
	

	
	
}
