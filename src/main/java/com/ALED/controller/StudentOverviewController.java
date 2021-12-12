package com.ALED.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.StudentOverviewDTO;
import com.ALED.service.impl.StudentOverviewService;

@RequestMapping("/studentoverview")
@RestController
public class StudentOverviewController {

	@Autowired
	StudentOverviewService studentOverviewService;
	
	@GetMapping
	public StudentOverviewDTO getInfo(@RequestParam(name = "user_id", required = false) Integer user_id) {
		return studentOverviewService.getInfo(user_id);
	}
}
