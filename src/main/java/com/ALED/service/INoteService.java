package com.ALED.service;

import java.util.List;

import com.ALED.DTO.NoteDTO;

public interface INoteService {

	NoteDTO create(NoteDTO dto);

	NoteDTO update(NoteDTO dto);

	List<NoteDTO> findAllByUser(Integer users_id, Integer lession_id);

	Boolean delete(Integer id);

}
