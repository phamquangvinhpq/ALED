package com.ALED.service;

import java.util.List;
import java.util.Optional;

import com.ALED.DTO.Exam.TongdiemDTO;
import com.ALED.entities.Exam;
import com.ALED.entities.ExamUser;
import com.ALED.entities.Users;

public interface ExamUserService {
    void create(Exam exam, Users userSet,Integer courseid);
    List<ExamUser> getExamListByUsername(String username);
    ExamUser findByExamAndUser(Integer examId, String username);
    void update(ExamUser examUser);
    Optional<ExamUser> findExamUserById(Integer id);

    List<ExamUser> getCompleteExams(Integer courseId, String username);
    List<ExamUser> findAllByExam_Id(Integer examId);
    List<ExamUser> findExamUsersByIsFinishedIsTrueAndExam_Id(Integer examId);
    
    
    List<TongdiemDTO> findAllBycourse(Integer userid,Integer courseid);

}
