package com.ALED.service;

import java.util.List;

import com.ALED.DTO.CategoryDTO;


public interface ICategoryService {
	public CategoryDTO create(CategoryDTO categoryDTO);
	public List<CategoryDTO> readAll();
	public CategoryDTO update(CategoryDTO categoryDTO);
	public CategoryDTO delete(Integer id);
	public CategoryDTO detail(Integer id);
	List<CategoryDTO> readAllByPage(int page, int size);
}
