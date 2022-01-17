package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.AuthorDTO;
import com.ALED.DTO.TeacherOverviewDTO;
import com.ALED.service.ITeacherOverviewService;

@RequestMapping("/teacheroverview")
@RestController
public class TeacherOverviewController {

	@Autowired
	ITeacherOverviewService iTeacherOverviewService;
	
	@GetMapping
	public List<TeacherOverviewDTO> getInfo(@RequestParam(name = "author_id", required = false) Integer author_id) {
		return iTeacherOverviewService.getInfo(author_id);
	}
	
	@GetMapping("getinfoauthor")
	public AuthorDTO getInfoAuthor(@RequestParam(name = "author_id", required = false) Integer author_id) {
		return iTeacherOverviewService.getInfoAuthor(author_id);
	}
	
}
