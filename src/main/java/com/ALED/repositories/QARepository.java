package com.ALED.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.QA;

@Repository
public interface QARepository extends JpaRepository<QA, Integer> {

	@Query(value = "SELECT * FROM `qa` WHERE qa.users_id = ?1 AND qa.course_id = ?2", nativeQuery = true)
	QA findByUserAndCourse(Integer users_id, Integer course_id);

	@Query(value = "SELECT id FROM `qa` WHERE users_id = ?1 AND course_id = ?2", nativeQuery = true)
	Integer getIDByUserAndCourse(Integer users_id, Integer course_id);

}
