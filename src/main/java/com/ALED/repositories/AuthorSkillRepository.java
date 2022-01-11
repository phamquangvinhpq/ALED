package com.ALED.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Author;
import com.ALED.entities.author_skill;

@Repository
public interface AuthorSkillRepository extends JpaRepository<author_skill, Integer> {
	
	@Query(value = "SELECT * FROM `author_skill` INNER JOIN author ON author_skill.author_id = author.id WHERE author_skill.id = ?1",nativeQuery = true)
	List<author_skill> findByAuthorId(Integer id);
	
}
