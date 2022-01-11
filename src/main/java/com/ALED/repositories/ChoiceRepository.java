package com.ALED.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Choice;

@Repository
public interface ChoiceRepository extends JpaRepository<Choice, Integer> {
    @Query(value="select c.corrected from choice c where c.id = :id", nativeQuery=true)
    Integer findIsCorrectedById(Integer id);

    @Query(value="select c.choice_text from choice c where c.id=:id", nativeQuery=true)
    String findChoiceTextById(Integer id);
}
