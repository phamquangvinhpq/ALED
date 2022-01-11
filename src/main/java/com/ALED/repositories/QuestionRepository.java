package com.ALED.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Question;
import com.ALED.entities.QuestionType;
import com.ALED.entities.Section;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
	List<Question> findBySection(Section section);

	List<Question> findByQuestionType(QuestionType questionType);

	Page<Question> findQuestionsBySection(Pageable pageable, Section section);

	Page<Question> findQuestionsBySectionAndDeletedFalse(Pageable pageable, Section section);

	Page<Question> findAll(Pageable pageable);

	@Query(value = "select q.id from question q where q.id =:questionId", nativeQuery = true)
	String findQuestionTextById(Integer questionId);
}
