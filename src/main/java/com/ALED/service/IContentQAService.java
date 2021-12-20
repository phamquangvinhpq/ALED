package com.ALED.service;

import java.util.List;

import com.ALED.DTO.ContentQADTO;

public interface IContentQAService {
	
	List<ContentQADTO> getAllContentAuthor(Integer qa_id);

	List<ContentQADTO> getAllContentStudent(Integer users_id, Integer course_id);

	ContentQADTO saveAuthor(ContentQADTO dto);

	ContentQADTO saveStudent(ContentQADTO dto);

}
