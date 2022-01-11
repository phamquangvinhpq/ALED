package com.ALED.repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Exam;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {

	List<Exam> findAllBySection_Course_Id(Integer courseId);

	public Page<Exam> findAll(Pageable pageable);
//	public Page<Exam> findAllByCreatedBy_Username(Pageable pageable, String username);
	
	@Query(value = "SELECT * FROM `exam` WHERE Section_id=:id",nativeQuery = true)
	List<Exam> findByCreated_by_id(@Param("id") Integer id);

	@Transactional
	@Modifying
	@Query(value = "UPDATE exam set exam.canceled=true where exam.id=?", nativeQuery = true)
	void cancelExam(Integer id);

}
