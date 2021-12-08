package com.ALED.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

	@Query(value = "SELECT * FROM course WHERE users_id =:id ", nativeQuery = true)
	List<Course> timcour(@Param("id") Integer id);

	@Query(value = "SELECT * FROM course WHERE image LIKE CONCAT('%',:image,'%')", nativeQuery = true)
	Course findByImage(@Param("image") String imageName);

	@Query(value = "SELECT * FROM course c WHERE c.category_id = ?1", nativeQuery = true)
	Page<Course> findByCategory(Integer categoryId, Pageable pageable);

	@Query(value = "SELECT * FROM course WHERE course_name LIKE %?1%", nativeQuery = true)
	Page<Course> findByCourseName(String courseName, Pageable pageable);

	@Query(value = "SELECT * FROM course c Where c.users_id = ?1", nativeQuery = true)
	Page<Course> pagecour(Integer usersId, Pageable pageable);

	@Query(value = "SELECT * FROM `course` WHERE id=:id ", nativeQuery = true)
	List<Course> timcoursbyid(@Param("id") Integer id);

}
