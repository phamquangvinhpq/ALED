package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.NoteDTO;
import com.ALED.service.INoteService;

@RestController
@RequestMapping("/note")
public class NoteController {
	@Autowired
	INoteService iNoteService;

	@GetMapping
	List<NoteDTO> findAllByUser(@RequestParam(name = "users_id", required = false) Integer users_id,
			@RequestParam(name = "lession_id", required = false) Integer lession_id) {
		return iNoteService.findAllByUser(users_id, lession_id);
	}

	@PostMapping
	NoteDTO create(@RequestBody NoteDTO dto) {
		return iNoteService.create(dto);
	}

	@PutMapping
	NoteDTO update(@RequestBody NoteDTO dto) {
		return iNoteService.update(dto);
	}

	@DeleteMapping("/{id}")
	Boolean delete(@PathVariable Integer id) {
		return iNoteService.delete(id);
	}

}
