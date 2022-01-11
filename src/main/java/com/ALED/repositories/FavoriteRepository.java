package com.ALED.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Favorite;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
	@Query(value = "select count(*) from favorite where user_id = ?1 and course_id = ?2", nativeQuery = true)
	Integer countByFavorite(int user_id , int course_id);
	
	@Query(value = "SELECT * FROM favorite WHERE user_id = ?1", nativeQuery = true)
	List<Favorite> findAllByUser(Integer user_id);
	
	@Query(value = "SELECT * FROM favorite WHERE user_id = ?1", nativeQuery = true)
	List<Favorite> findAllByUserPage(Integer user_id , Pageable pageable);
}
