package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.RateDTO;
import com.ALED.DTO.UserRateDTO;
import com.ALED.service.RateService;

@RestController
public class RateController {
	@Autowired
	private RateService rateService;

	@GetMapping("/rate")
	public List<UserRateDTO> rate(@RequestParam(required = false) Integer userId,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "2") int size) {
		return rateService.detailcour(userId,page,size);
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
	
	
	@GetMapping("/findrate/{userid}/{course}")
	public String findrate( @PathVariable("userid") Integer userid,@PathVariable("course") Integer course) {
		return rateService.findbyrate(userid, course);
	}
	
}
