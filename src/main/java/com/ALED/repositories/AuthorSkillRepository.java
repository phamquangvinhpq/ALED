package com.ALED.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Author;
import com.ALED.entities.author_skill;

@Repository
public interface AuthorSkillRepository extends JpaRepository<author_skill, Integer> {
	
	
}
