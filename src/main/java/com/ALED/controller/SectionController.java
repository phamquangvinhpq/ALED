package com.ALED.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.SectionDTO;
import com.ALED.service.SectionService;

@RequestMapping("/giangvien")
@RestController
public class SectionController {

	@Autowired
	SectionService sectionService;

	@GetMapping("/Section")
	public List<SectionDTO> readAll() {
		return sectionService.readAll();
	}

	@PutMapping("/Section")
	public SectionDTO update(@RequestBody SectionDTO sectiondto) {
		return sectionService.update(sectiondto);
	}

	@PostMapping("/Section")
	public SectionDTO create(@Valid @RequestBody SectionDTO sectionDTO) {

		return sectionService.create(sectionDTO);
	}

	@DeleteMapping("/Section/{id}")
	public SectionDTO delete(@PathVariable Integer id) {
		return sectionService.delete(id);
	}

	@GetMapping("/Section/{id}")
	public SectionDTO detail(@PathVariable Integer id) {
		return sectionService.detail(id);
	}

	@GetMapping("/Sectioncour/{id}")
	public List<SectionDTO> detailcour(@PathVariable Integer id) {

		return sectionService.detailcour(id);
	}

//	@GetMapping("/Section/{pageno}/{pagesize}")
//	public List<Section> getpage( @PathVariable Integer pageno,@PathVariable Integer pagesize) {
//		
//		return sectionService.findpage(pageno, pagesize);
//		
//	}


	
	@GetMapping("/test/{id}/{course_id}")
	public String test(@PathVariable Integer id,
			@PathVariable Integer course_id) {
		return sectionService.muakhoahoc(id, course_id);
	}

}
