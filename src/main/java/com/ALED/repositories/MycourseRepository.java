package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Mycourse;

@Repository
public interface MycourseRepository extends JpaRepository<Mycourse, Integer> {

	@Query(value = "SELECT * FROM mycourse WHERE user_id=:id", nativeQuery = true)
	List<Mycourse> findbymycourse(@Param("id") Integer id);
	
	


}
