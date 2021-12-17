package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.RateDTO;
import com.ALED.DTO.UserRateDTO;
import com.ALED.service.RateService;

@RestController
public class RateController {
	@Autowired
	private RateService rateService;
	
	@GetMapping("/rate/{id}")
	public List<UserRateDTO> rate(@PathVariable Integer id) {
		return rateService.detailcour(id);
	}
	
	
	@GetMapping("/avg/{id}")
	public String avg(@RequestBody @PathVariable Integer id) {
		return rateService.avgstar(id);
	}

	@GetMapping("/count/{id}")
	public String count(@RequestBody @PathVariable Integer id) {
		return rateService.count(id);
	}
	
	@PostMapping("/addrate")
	public RateDTO saverate(@RequestBody RateDTO ratedto) {
		return rateService.save(ratedto);
	}
	
	

}
