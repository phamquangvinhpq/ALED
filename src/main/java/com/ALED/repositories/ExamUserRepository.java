package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.ExamUser;

@Repository
public interface ExamUserRepository extends JpaRepository<ExamUser, Integer> {
	List<ExamUser> findAllByUser_Username(String username);

	List<ExamUser> findAllByUser_UsernameAndExam_Canceled(String username, boolean canceled);

	ExamUser findByExam_IdAndUser_Username(Integer examId, String username);

	List<ExamUser> findAllByExam_Section_Course_IdAndUser_UsernameAndTotalPointIsGreaterThan(Integer courseId,
			String username, Double point);

	List<ExamUser> findAllByExam_Id(Integer examId);

	List<ExamUser> findExamUsersByOrderByTimeFinish();

	List<ExamUser> findExamUsersByIsFinishedIsTrueAndExam_Id(Integer examId);
	
	@Query(value = "SELECT * FROM `exam_user` WHERE user_id=:userid AND course_id =:courseid",nativeQuery = true)
	List<ExamUser> findAllByUser_UsernameAndCourse_id(@Param("userid") Integer userid,@Param("courseid") Integer courseid);
}
