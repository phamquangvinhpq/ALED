package com.ALED.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Author;



@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
	
	Author findByNameContaining(String name);
	
	@Query("SELECT a FROM Author a")
	Page<Author> findAll(Pageable pageable);
}
