package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Orders;



@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {

	@Query(value = "SELECT * FROM `order` WHERE user_id=:id", nativeQuery = true)
	List<Orders> findbyorder(@Param("id") Integer id);



}
