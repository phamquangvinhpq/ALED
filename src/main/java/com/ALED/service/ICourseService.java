package com.ALED.service;

import java.util.List;

import com.ALED.DTO.CourseDTO;

public interface ICourseService {

	List<CourseDTO> readAll();

	CourseDTO save(CourseDTO author);

	CourseDTO update(CourseDTO author);

	CourseDTO delete(Integer id);

	List<CourseDTO> detail(Integer id);

	List<CourseDTO> findpage(Integer userId,int page, int size);

	CourseDTO searchUser(String keyword);

	List<CourseDTO> detailus(Integer id);

	List<CourseDTO> getAll(int page, int size);
	
	List<CourseDTO> getAllByName(String courseName, int page, int size);
	
	List<CourseDTO> getAllByCategory(Integer categoryId, int page, int size);

	List<CourseDTO> buythemost();


}
