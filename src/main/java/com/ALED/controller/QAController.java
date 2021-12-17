package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.QADTO;
import com.ALED.service.IQAService;

@RestController
@RequestMapping("/qa")
public class QAController {
	
	@Autowired
	IQAService iqaService;
	
	@PostMapping("")
	QADTO save(@RequestBody QADTO dto) {
		return iqaService.save(dto);
	}
	
	@PostMapping("/get")
	List<QADTO> getAll(@RequestBody QADTO dto) {
		return iqaService.getAll(dto);
	}

}
