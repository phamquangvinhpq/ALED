package com.ALED.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Author;
import com.ALED.entities.Users;



@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
	
	Author findByNameContaining(String name);
	
	@Query("SELECT a FROM Author a")
	Page<Author> findAll(Pageable pageable);
	
	@Query(value = "SELECT * FROM author WHERE photo LIKE CONCAT('%',:photo,'%')", nativeQuery = true)
	Author findByImage(@Param("photo") String imageName);
}
