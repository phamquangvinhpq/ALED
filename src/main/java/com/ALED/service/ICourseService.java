package com.ALED.service;

import java.util.List;

import com.ALED.DTO.CourseDTO;
import com.ALED.entities.Course;

public interface ICourseService {

	List<CourseDTO> readAll();

	CourseDTO save(CourseDTO author);

	CourseDTO update(CourseDTO author);

	CourseDTO delete(Integer id);

	List<CourseDTO> detail(Integer id);

	List<CourseDTO> findpage(Integer userId,int page, int size);

	CourseDTO searchUser(String keyword);

	List<CourseDTO> detailus(Integer id,int page,int size);

	List<CourseDTO> getAll(int page, int size);
	
	List<CourseDTO> getAllByName(String courseName, int page, int size);
	
	List<CourseDTO> getAllByCategory(Integer categoryId, int page, int size);

	Course AcceptCour(Course course);

	List<CourseDTO> getAllCouNoAct(int page, int size);

	List<CourseDTO> getAllCouAct(int page, int size);
	
	List<CourseDTO> getCourseByAuthor(Integer author_id, int page, int size);

	List<CourseDTO> getPriceAsc(int page, int size);

	List<CourseDTO> getPriceDesc(int page, int size);

	List<CourseDTO> getPriceAscByCate(Integer categoryId,int page, int size);

	List<CourseDTO> getPriceDescByCate(Integer categoryId,int page, int size);
	
	List<CourseDTO> getRateAsc(int page, int size);

	List<CourseDTO> getRateDesc(int page, int size);

	List<CourseDTO> getRateAscByCate(Integer categoryId,int page, int size);

	List<CourseDTO> getRateDescByCate(Integer categoryId,int page, int size);

	List<CourseDTO> getPrice3ByCate(Integer categoryId, int page, int size);

	List<CourseDTO> getPrice2ByCate(Integer categoryId, int page, int size);

	List<CourseDTO> getPrice1ByCate(Integer categoryId, int page, int size);

	List<CourseDTO> getPrice3(int page, int size);

	List<CourseDTO> getPrice2(int page, int size);

	List<CourseDTO> getPrice1(int page, int size);

	List<CourseDTO> findAllByCreateDate(String sort, int page, int size);

	List<CourseDTO> buythemost(Integer page, Integer size);

}
