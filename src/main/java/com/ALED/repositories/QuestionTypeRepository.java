package com.ALED.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ALED.entities.QuestionType;
import com.ALED.enums.EQTypeCode;

@Repository
public interface QuestionTypeRepository extends JpaRepository<QuestionType, Integer> {

    Optional<QuestionType> findAllByTypeCode(EQTypeCode typeCode);
}
