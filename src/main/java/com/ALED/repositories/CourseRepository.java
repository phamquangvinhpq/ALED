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

	@Query(value = "SELECT * FROM `course` WHERE id=:id ", nativeQuery = true)
	List<Course> timcoursbyid(@Param("id") Integer id);

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

	@Query(value = "SELECT ROUND(AVG(rate.rate),1) FROM rate INNER JOIN course on rate.course_id = course.id INNER JOIN author on course.author_id = author.id\r\n" +
			"WHERE course.author_id = ?1", nativeQuery = true)
	String instructorRating(Integer authorId);

	@Query(value = "SELECT course_id FROM `mycourse`GROUP BY course_id ORDER BY COUNT(mycourse.course_id) DESC LIMIT 6", nativeQuery = true)
	List<Integer> buyTheMost();


	@Query(value = "Select Count(*) from course", nativeQuery = true )
	Integer countCour();

	@Query(value = "Select * from course where status = 1",nativeQuery = true)
	List<Course> getAllCouAct();

	@Query(value = "Select * from course where status = 0",nativeQuery = true)
	List<Course> getAllCouNoAct();

	@Query(value = "SELECT COUNT(*) FROM `section` where course_id = ?1", nativeQuery = true)
	Integer countChapter(Integer course_id);

	@Query(value = "SELECT * FROM course c WHERE c.author_id = ?1", nativeQuery = true)
	Page<Course> getCourseByAuthor(Integer author_id, Pageable paging);
}
