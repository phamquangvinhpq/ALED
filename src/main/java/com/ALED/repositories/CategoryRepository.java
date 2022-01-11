package com.ALED.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
    @Query(value = "select count(*) from course where category_id = ?1", nativeQuery = true)
    Integer countCourse(Integer category_id);

    @Query(value = "Select Count(*) from category", nativeQuery = true )
    Integer countCate();
    
}
