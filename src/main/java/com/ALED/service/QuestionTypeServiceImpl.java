package com.ALED.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.entities.QuestionType;
import com.ALED.enums.EQTypeCode;
import com.ALED.repositories.QuestionTypeRepository;

@Service
public class QuestionTypeServiceImpl implements QuestionTypeService {

    private QuestionTypeRepository questionTypeRepository;

    @Autowired
    public QuestionTypeServiceImpl(QuestionTypeRepository questionTypeRepository) {
        this.questionTypeRepository = questionTypeRepository;
    }

    @Override
    public Optional<QuestionType> getQuestionTypeById(Integer id) {
        return questionTypeRepository.findById(id);
    }

    @Override
    public Optional<QuestionType> getQuestionTypeByCode(EQTypeCode code) {
        return questionTypeRepository.findAllByTypeCode(code);
    }

    @Override
    public List<QuestionType> getQuestionTypeList() {
        return questionTypeRepository.findAll();
    }

    @Override
    public void saveQuestionType(QuestionType questionType) {
        questionTypeRepository.save(questionType);
    }

    @Override
    public void delete(Integer id) {
        questionTypeRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Integer id) {
        return questionTypeRepository.existsById(id);
    }
}
