package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ALED.DTO.CategoryDTO;
import com.ALED.DTO.UserDTO;
import com.ALED.entities.Category;
import com.ALED.entities.Users;
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
			categoryDTO.setCountCourse(categoryRepository.countCourse(category.getId()));
			categoryDTOs.add(categoryDTO);
		}
		return categoryDTOs;
	}
	
	@Override
	public List<CategoryDTO> readAllByPage(int page,int size){
		List<Category> listEnity = new ArrayList<Category>();
		List<CategoryDTO> listDto = new ArrayList<CategoryDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Category> pageCourses = categoryRepository.findAll(paging);
		listEnity = pageCourses.getContent();
		for (Category entity : listEnity) {
			CategoryDTO dto = new CategoryDTO();
			BeanUtils.copyProperties(entity, dto);
			
			listDto.add(dto);
		}
		return listDto;
	}

}
