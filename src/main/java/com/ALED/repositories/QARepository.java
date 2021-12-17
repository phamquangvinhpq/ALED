package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.QA;

@Repository
public interface QARepository extends JpaRepository<QA, Integer> {

	@Query(value = "SELECT * FROM `qa` WHERE qa.users_id = ?1 AND qa.author_id=?2 AND qa.course_id = ?3", nativeQuery = true)
	List<QA> findAllQuery(Integer users_id, Integer author_id, Integer course_id);
}
