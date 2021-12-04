package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Section;



@Repository
public interface SectionRepository extends JpaRepository<Section, Integer> {

	 @Query(value = "SELECT * FROM section WHERE course_id =:id ",nativeQuery = true)
	 List<Section> timcour(@Param("id") Integer id);
	 
		
		@Query(value = "SELECT * FROM favorite WHERE user_id=:user_id AND course_id =:course_id",nativeQuery = true)
		String finbykhoahoc(@Param("user_id") Integer user_id,
				@Param("course_id") Integer course_id);
}
