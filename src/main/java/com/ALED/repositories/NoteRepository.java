package com.ALED.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ALED.entities.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer>{
	@Query(value = "SELECT * FROM note WHERE users_id = ?1 AND lession_id = ?2", nativeQuery = true)
	List<Note> findAllByUser(Integer users_id, Integer lession_id);

}
