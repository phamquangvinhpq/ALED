package com.ALED.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ALED.entities.ContentQA;

@Repository
public interface ContentQARepository extends JpaRepository<ContentQA, Integer> {

}
