package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.CategoryDTO;
import com.ALED.entities.Category;
import com.ALED.repositories.CategoryRepository;

@Service
public class CategoryService implements ICategoryService {
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public CategoryDTO create(CategoryDTO categoryDTO) {
		Category category = new Category();

		BeanUtils.copyProperties(categoryDTO, category);
		categoryRepository.save(category);
		categoryDTO.setId(category.getId());
		return categoryDTO;
	}

	@Override
	public CategoryDTO update(CategoryDTO categoryDTO) {
		Optional<Category> optionalCategory = categoryRepository.findById(categoryDTO.getId());
		if (optionalCategory.isPresent()) {
			Category category = optionalCategory.get();
			BeanUtils.copyProperties(categoryDTO, category);
			categoryRepository.save(category);
		}
		return categoryDTO;
	}

	@Override
	public CategoryDTO delete(Integer id) {
		Optional<Category> optionalcate = categoryRepository.findById(id);
		if (optionalcate.isPresent()) {
			CategoryDTO categoryDTO = new CategoryDTO();
			Category category = optionalcate.get();
			BeanUtils.copyProperties(category, categoryDTO);
			categoryRepository.deleteById(id);
			return categoryDTO;
		}
		return null;
	}

	@Override
	public CategoryDTO detail(Integer id) {
		Optional<Category> optionalCategory = categoryRepository.findById(id);
		if (optionalCategory.isPresent()) {
			CategoryDTO categoryDTO = new CategoryDTO();
			Category category = optionalCategory.get();
			BeanUtils.copyProperties(category, categoryDTO);
			return categoryDTO;
		} else
			return null;
	}

	@Override
	public List<CategoryDTO> readAll() {
		List<CategoryDTO> categoryDTOs = new ArrayList<CategoryDTO>();
		List<Category> categorys = categoryRepository.findAll();
		for (Category category : categorys) {
			CategoryDTO categoryDTO = new CategoryDTO();
			BeanUtils.copyProperties(category, categoryDTO);
			categoryDTOs.add(categoryDTO);
		}
		return categoryDTOs;
	}

}
