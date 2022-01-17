package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.entities.chungchi;
import com.ALED.repositories.ChungchiRepstory;
import com.ALED.service.Chungchiservice;

@RestController
public class ChungchiControler {
	@Autowired
	private Chungchiservice chungchiservice;
	@Autowired
	private ChungchiRepstory chungchiRepstory;

	@PostMapping("/addchungchi")
	public void addchungchi(@RequestBody chungchi chungchi) {
		chungchiservice.addchungchi(chungchi);
	}

	@GetMapping("/getchungchi")
	public List<chungchi> getallchungchi() {
		return chungchiservice.getallchungchi();
	}

	@GetMapping("/checkchungchi")
	public String checkchungchi(@RequestParam("username") String username, @RequestParam("course") Integer course) {
		String a = chungchiRepstory.getchungchi(username, course);
		if (a != null) {
			return "yes";
		} else {
			return "no";
		}

	}

}
