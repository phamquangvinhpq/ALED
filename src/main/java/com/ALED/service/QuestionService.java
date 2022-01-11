package com.ALED.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ALED.DTO.Exam.AnswerSheet;
import com.ALED.DTO.Exam.ExamQuestionPoint;
import com.ALED.entities.Question;
import com.ALED.entities.QuestionType;
import com.ALED.entities.Section;

public interface QuestionService {
	Optional<Question> getQuestionById(Integer id);

	List<Question> getQuestionByPart(Section part);

	List<Question> getQuestionByQuestionType(QuestionType questionType);

	List<Question> getQuestionPointList(List<ExamQuestionPoint> examQuestionPoints);

	List<AnswerSheet> convertFromQuestionList(List<Question> questionList);

	List<Question> getQuestionList();
	
	
    Page<Question> findQuestionsBySection_id(Pageable pageable, Integer partId);


	Page<Question> findQuestionsByPart(Pageable pageable, Section part);

	Page<Question> findQuestionsByPartAndDeletedFalse(Pageable pageable, Section part);

	Page<Question> findAllQuestions(Pageable pageable);

	String findQuestionTextById(Integer questionId);

	void save(Question question);

	void update(Question question);

	void delete(Integer id);

}
