package com.ALED.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.NoteDTO;
import com.ALED.entities.Note;
import com.ALED.repositories.NoteRepository;
import com.ALED.service.INoteService;

@Service
public class NoteService implements INoteService {
	@Autowired
	NoteRepository noteRepository;

	@Override
	public NoteDTO create(NoteDTO dto) {
		Note entity = new Note();
		BeanUtils.copyProperties(dto, entity);
		noteRepository.save(entity);
		dto.setId(entity.getId());
		return dto;
	}

	@Override
	public NoteDTO update(NoteDTO dto) {
		Note entity = noteRepository.getById(dto.getId());
		if (entity != null) {
			BeanUtils.copyProperties(dto, entity);
			noteRepository.save(entity);
			return dto;
		}
		return null;
	}

	@Override
	public Boolean delete(Integer id) {
		if (noteRepository.getById(id) != null) {
			noteRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public List<NoteDTO> findAllByUser(Integer users_id, Integer lession_id) {
		List<NoteDTO> dtos = new ArrayList<NoteDTO>();

		List<Note> entitys = noteRepository.findAllByUser(users_id, lession_id);
		for (Note note : entitys) {
			NoteDTO dto = new NoteDTO();
			BeanUtils.copyProperties(note, dto);
			dtos.add(dto);
		}
		return dtos;
	}

}
