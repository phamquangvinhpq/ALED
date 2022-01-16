package com.ALED.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Report;
@Repository
public interface ReportRepository extends JpaRepository<Report, Integer>{

	@Query(value = "SELECT * FROM REPORT WHERE STATUS = ?1", nativeQuery = true)
	Page<Report> findAllByStatus(Integer status, Pageable paging);
	
	@Query(value = "SELECT * FROM REPORT WHERE link_video LIKE CONCAT('%',:image,'%')", nativeQuery = true)
	Report findByImage(@Param("image") String imageName);

}
