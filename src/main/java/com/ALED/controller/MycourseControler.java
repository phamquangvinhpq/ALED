package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.MycourseDTO;
import com.ALED.service.MycourseService;

@RestController
public class MycourseControler {
	@Autowired
	private MycourseService mycourseService;

	@GetMapping("/mycourse/{id}")
	public List<MycourseDTO> readAll(@PathVariable("id") Integer id,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		return mycourseService.readallbyid(id,page,size);
	}

	@PostMapping("/mycourse")
	public MycourseDTO add(@RequestBody MycourseDTO mycourseDTO) {

		return mycourseService.create(mycourseDTO);
	}
	
	
}
