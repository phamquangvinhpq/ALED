package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.AuthorDTO;
import com.ALED.entities.Author;
import com.ALED.service.AuthorService;

@RestController
@RequestMapping("/author")
public class AuthorController {

	@Autowired
	AuthorService AuthorService;
	
	
	@GetMapping("")
	public List<AuthorDTO> getAll(){
		return AuthorService.readAll();
	}
	
	@PutMapping("/edit")
	public AuthorDTO edit(@RequestBody AuthorDTO auth){
		return AuthorService.save(auth);
	}
	
	@PostMapping("/save")
	public AuthorDTO save(@RequestBody AuthorDTO auth) {
		return AuthorService.save(auth);
	}
	
	@DeleteMapping("/delete/{id}")
	public AuthorDTO delete(@PathVariable Integer id) {
		return AuthorService.delete(id);
	}
	
	@GetMapping("/{id}")
	public AuthorDTO detail(@PathVariable Integer id) {
		return AuthorService.detail(id);
	}
	
	
	@GetMapping("/viewuser/{pageno}/{pagesize}")
	public List<Author> page(@PathVariable Integer pageno,@PathVariable Integer pagesize){
		
		return AuthorService.findpage(pageno, pagesize);
	}
}
