package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.QADTO;
import com.ALED.service.IQAService;

@RestController
@RequestMapping("/qa")
public class QAController {

	@Autowired
	IQAService iqaService;

	@GetMapping("/getbystatus")
	List<QADTO> getBystatus(@RequestParam("status") Integer status, @RequestParam("users_id") Integer users_id
			,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
		return iqaService.getBystatus(status, users_id,page,size);
	}

}
