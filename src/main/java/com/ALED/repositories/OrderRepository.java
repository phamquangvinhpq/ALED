package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Orders;



@Repository
public interface OrderRepository extends JpaRepository<Orders, Integer> {

	@Query(value = "SELECT * FROM orders WHERE user_id = ?1", nativeQuery = true)
	List<Orders> findByOrder(Integer user_id);


}
