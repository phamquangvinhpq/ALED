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

import com.ALED.DTO.CategoryDTO;
import com.ALED.repositories.CategoryRepository;
import com.ALED.service.ICategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private ICategoryService iCategoryService;

	@Autowired
	private CategoryRepository categoryRepository;
	
	@GetMapping("/")
	public List<CategoryDTO> readAll() {
		return iCategoryService.readAll();
	}

	@GetMapping("/count")
	public Integer count() {
		return categoryRepository.countCate();
	}
	
	@DeleteMapping("/{id}")
	public CategoryDTO delete(@PathVariable Integer id) {
		return iCategoryService.delete(id);
	}
	
	@GetMapping("/{id}")
	public CategoryDTO detail(@PathVariable Integer id) {
		return iCategoryService.detail(id);
	}
	
	@PostMapping("/add")
	public CategoryDTO add(@RequestBody CategoryDTO categoryDTO){
		return iCategoryService.create(categoryDTO);
	}
	
	@PutMapping("/edit")
	public CategoryDTO edit(@RequestBody CategoryDTO categoryDTO){
		return iCategoryService.update(categoryDTO);
	}

}
