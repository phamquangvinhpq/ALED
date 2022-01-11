package com.ALED.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ALED.DTO.Exam.AnswerSheet;
import com.ALED.DTO.Exam.ChoiceList;
import com.ALED.DTO.Exam.ExamQuestionPoint;
import com.ALED.entities.Exam;

public interface ExamService {

    Exam saveExam(Exam exam);

    Page<Exam> findAll(Pageable pageable);

    void cancelExam(Integer id);

    List<Exam> getAll();

    Optional<Exam> getExamById(Integer id);

//    Page<Exam> findAllByCreatedBy_Username(Pageable pageable, String username);

    List<ChoiceList> getChoiceList(List<AnswerSheet> userChoices, List<ExamQuestionPoint> examQuestionPoints);
}
