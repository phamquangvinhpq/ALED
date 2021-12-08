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

	@Query(value = "SELECT * FROM course c Where c.users_id = ?1",nativeQuery = true)
	Page<Course> pagecour(Integer usersId,Pageable pageable);
	
	@Query(value = "SELECT COUNT(*) FROM mycourse INNER JOIN course on mycourse.course_id = course.id INNER JOIN author on course.author_id = author.id\r\n" + 
			"WHERE course.author_id = ?1", nativeQuery = true)
	Integer totalStudents(Integer authorId);
	
	@Query(value = "SELECT COUNT(*) from course c WHERE c.author_id = ?1", nativeQuery = true)
	Integer totalCourse(Integer authorId);
	
	@Query(value = "SELECT COUNT(*) FROM rate INNER JOIN course on rate.course_id = course.id INNER JOIN author on course.author_id = author.id\r\n" + 
			"WHERE course.author_id = ?1", nativeQuery = true)
	Integer totalRating(Integer authorId);
	
	@Query(value = "SELECT AVG(rate.rate) FROM rate INNER JOIN course on rate.course_id = course.id INNER JOIN author on course.author_id = author.id\r\n" + 
			"WHERE course.author_id = ?1", nativeQuery = true)
	float instructorRating(Integer authorId);
	

}
