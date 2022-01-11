package com.ALED.service;

import java.util.List;
import java.util.Optional;

import com.ALED.entities.QuestionType;
import com.ALED.enums.EQTypeCode;

public interface QuestionTypeService {
    Optional<QuestionType> getQuestionTypeById(Integer id);

    Optional<QuestionType> getQuestionTypeByCode(EQTypeCode code);

    List<QuestionType> getQuestionTypeList();

    void saveQuestionType(QuestionType questionType);

    void delete(Integer id);

    boolean existsById(Integer id);
}
