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

import com.ALED.DTO.CourseDTO;
import com.ALED.entities.Course;
import com.ALED.repositories.AuthorRepository;
import com.ALED.repositories.CategoryRepository;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.UserRepository;

@Service
public class CourseService implements ICourseService {

	@Autowired
	CourseRepository courseRepository;

	@Autowired
	AuthorRepository authorRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	IRateService IrateService;

	@Override
	public List<CourseDTO> readAll() {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		List<Course> lstCourse = courseRepository.findAll();
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public CourseDTO save(CourseDTO author) {
		Course course = new Course();
		BeanUtils.copyProperties(author, course);
		course.setCategory(categoryRepository.getById(author.getCategory_id()));
		course.setAuthor(authorRepository.getById(author.getAuthor_id()));
		course.setUsers(userRepository.getById(author.getUser_id()));
		
		courseRepository.save(course);
		author.setId(course.getId());
		return author;
	}

	@Override
	public CourseDTO update(CourseDTO author) {
		Optional<Course> optional = courseRepository.findById(author.getId());
		if (optional.isPresent()) {
			Course course = optional.get();
			BeanUtils.copyProperties(author, course);
			course.setCategory(categoryRepository.getById(author.getCategory_id()));
			courseRepository.save(course);
		}
		return author;
	}

	@Override
	public CourseDTO delete(Integer id) {
		CourseDTO section = new CourseDTO();
		Optional<Course> optional = courseRepository.findById(id);
		if (optional.isPresent()) {
			Course entity = optional.get();
			BeanUtils.copyProperties(entity, section);
			courseRepository.delete(entity);
		}
		return section;
	}

	@Override
	public List<CourseDTO> detail(Integer id) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		List<Course> optional = courseRepository.timcoursbyid(id);
		
		for (Course course : optional) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			courseDTO.setRate(IrateService.avgstar(course.getId()));
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
		
	}

	
	@Override
	public List<CourseDTO> findpage(Integer userId,int page, int size) {
		List<Course> courses = new ArrayList<Course>();
		List<CourseDTO> courseDTOs = new ArrayList<CourseDTO>();
		Pageable pageable = PageRequest.of(page, size);
		Page<Course> paging;
		if(userId == null) {
			paging = courseRepository.findAll(pageable);
		}else {
			paging = courseRepository.pagecour(userId, pageable);
		courses = paging.getContent();
		for (Course course : courses) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(course, dto);
			dto.setCategory_id(course.getCategory().getId());
			dto.setAuthor_id(course.getAuthor().getId());
			dto.setUser_id(course.getUsers().getId());
			courseDTOs.add(dto);
		}
		}
		return courseDTOs;
	}

	@Override
	public CourseDTO searchUser(String keyword) {

		return null;
	}


	@Override
	public List<CourseDTO> detailus(Integer id) {
		List<CourseDTO> lstCourseDTO = new ArrayList<CourseDTO>();
		List<Course> lstCourse = courseRepository.timcour(id);
		for (Course course : lstCourse) {
			CourseDTO courseDTO = new CourseDTO();
			BeanUtils.copyProperties(course, courseDTO);
			courseDTO.setCategory_id(course.getCategory().getId());
			courseDTO.setAuthor_id(course.getAuthor().getId());
			courseDTO.setUser_id(course.getUsers().getId());
			lstCourseDTO.add(courseDTO);
		}
		return lstCourseDTO;
	}

	@Override
	public List<CourseDTO> getAllByName(String courseName, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (courseName == null) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.findByCourseName(courseName, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			listDto.add(dto);
		}
		return listDto;
	}
	
	@Override
	public List<CourseDTO> getAllByCategory(Integer categoryId, int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses;
		if (categoryId == 0) {
			pageCourses = courseRepository.findAll(paging);
		} else
			pageCourses = courseRepository.findByCategory(categoryId, paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<CourseDTO> getAll(int page, int size) {
		List<Course> listEnity = new ArrayList<Course>();
		List<CourseDTO> listDto = new ArrayList<CourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Course> pageCourses = courseRepository.findAll(paging);
		listEnity = pageCourses.getContent();
		for (Course entity : listEnity) {
			CourseDTO dto = new CourseDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCategory_id(entity.getCategory().getId());
			dto.setAuthor_id(entity.getAuthor().getId());
			dto.setUser_id(entity.getUsers().getId());
			listDto.add(dto);
		}
		return listDto;
	}

}
