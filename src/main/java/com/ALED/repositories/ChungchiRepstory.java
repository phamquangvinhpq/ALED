package com.ALED.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ALED.entities.chungchi;

public interface ChungchiRepstory extends JpaRepository<chungchi, Integer> {
	@Query(value = "SELECT * FROM `chungchi` WHERE username =:username AND idcourse=:course",nativeQuery = true)
	String getchungchi(@Param("username") String username,@Param("course") Integer course );

}
