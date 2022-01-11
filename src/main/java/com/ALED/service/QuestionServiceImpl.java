package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import javax.persistence.EntityManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ALED.DTO.Exam.AnswerSheet;
import com.ALED.DTO.Exam.ExamQuestionPoint;
import com.ALED.entities.Choice;
import com.ALED.entities.Question;
import com.ALED.entities.QuestionType;
import com.ALED.entities.Section;
import com.ALED.repositories.QuestionRepository;

@Service
public class QuestionServiceImpl implements QuestionService {
    Logger logger = LoggerFactory.getLogger(QuestionServiceImpl.class);
    private QuestionRepository questionRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public Optional<Question> getQuestionById(Integer id) {
        return questionRepository.findById(id);
    }

    @Override
    public List<Question> getQuestionByPart(Section part) {
        return questionRepository.findBySection(part);
    }

    @Override
    public List<Question> getQuestionByQuestionType(QuestionType questionType) {
        return questionRepository.findByQuestionType(questionType);
    }

    @Override
    public List<Question> getQuestionPointList(List<ExamQuestionPoint> examQuestionPoints) {
        List<Question> questions = new ArrayList<>();
        examQuestionPoints.forEach(examQuestionPoint -> {
            Optional<Question> question = questionRepository.findById(examQuestionPoint.getQuestionId());
            questions.add(question.get());
        });
        return questions;
    }

    @Override
    public List<AnswerSheet> convertFromQuestionList(List<Question> questionList) {
        List<AnswerSheet> answerSheets = new ArrayList<>();
        questionList.forEach(question -> {
        	
            List<Choice> choices = question.getChoices();
            choices.stream().filter(s -> s.getIsCorrected()==1) 
            .forEach(s->{
            	s.setIsCorrected(2);
            });
           
            AnswerSheet answerSheet = new AnswerSheet(question.getId(),choices, question.getPoint());
            answerSheets.add(answerSheet);
        });
        return answerSheets;
    }
    
    

    @Override
    public List<Question> getQuestionList() {
        return questionRepository.findAll();
    }

    @Override
    public Page<Question> findQuestionsByPart(Pageable pageable, Section part) {
        return questionRepository.findQuestionsBySection(pageable, part);
    }

    @Override
    public Page<Question> findQuestionsByPartAndDeletedFalse(Pageable pageable, Section part) {
        return questionRepository.findQuestionsBySectionAndDeletedFalse(pageable, part);
    }


    @Override
    public Page<Question> findAllQuestions(Pageable pageable) {
        return questionRepository.findAll(pageable);
    }

    @Override
    public String findQuestionTextById(Integer questionId) {
        return questionRepository.findQuestionTextById(questionId);
    }


    @Override
    public void save(Question question) {
        questionRepository.save(question);
    }

    @Override
    public void update(Question question) {
        questionRepository.save(question);
    }

    @Override
    public void delete(Integer id) {
        questionRepository.deleteById(id);
    }

	@Override
	public Page<Question> findQuestionsBySection_id(Pageable pageable, Integer partId) {
		// TODO Auto-generated method stub
		return null;
	}

}
