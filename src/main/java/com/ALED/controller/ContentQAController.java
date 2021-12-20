package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.ContentQADTO;
import com.ALED.service.IContentQAService;

@RestController
@RequestMapping("/contentqa")
public class ContentQAController {

	@Autowired
	IContentQAService iContentQAService;

	@PostMapping("/student")
	ContentQADTO saveStudent(@RequestBody ContentQADTO dto) {
		return iContentQAService.saveStudent(dto);
	}

	@PostMapping("/author")
	ContentQADTO saveAuthor(@RequestBody ContentQADTO dto) {
		return iContentQAService.saveAuthor(dto);
	}

	@GetMapping("/getallcontentauthor")
	List<ContentQADTO> getAllContentAuthor(@RequestParam(name = "qa_id", required = false) Integer qa_id) {
		return iContentQAService.getAllContentAuthor(qa_id);
	}

	@GetMapping("/getallcontentstudent")
	List<ContentQADTO> getAllContentStudent(@RequestParam(name = "users_id", required = false) Integer users_id,
			@RequestParam(name = "course_id", required = false) Integer course_id) {
		return iContentQAService.getAllContentStudent(users_id, course_id);
	}

}
