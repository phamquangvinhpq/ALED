package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.FavoriteDTO;
import com.ALED.service.IFavoriteService;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {

	@Autowired
	private IFavoriteService iFavoriteService;

	@PostMapping
	public FavoriteDTO create(@RequestBody FavoriteDTO dto) {
		System.out.println(dto);
		return iFavoriteService.create(dto);
	}

	@GetMapping
	public List<FavoriteDTO> findAllByUser(@RequestParam(name = "user_id", required = false) Integer user_id) {
		return iFavoriteService.findAllByUser(user_id);
	}
	
	@DeleteMapping()
	public boolean delete(@RequestParam(name = "user_id", required = false) Integer user_id, @RequestParam(name = "course_id", required = false) Integer course_id) {
		return iFavoriteService.delete(user_id ,course_id);
	}

}
