package com.ALED.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.AuthorDTO;
import com.ALED.DTO.TeacherOverviewDTO;
import com.ALED.entities.Author;
import com.ALED.repositories.AuthorRepository;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.MycourseRepository;
import com.ALED.service.ITeacherOverviewService;

@Service
public class TeacherOverviewService implements ITeacherOverviewService{
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	MycourseRepository mycourseRepository;
	
	@Autowired
	AuthorRepository authorRepository;
	

	@Override
	public List<TeacherOverviewDTO> getInfo(Integer authorId) {
		List<TeacherOverviewDTO> listDTO = new ArrayList<TeacherOverviewDTO>();
		TeacherOverviewDTO dto = new TeacherOverviewDTO();
		dto.setTotalCourse(courseRepository.totalCourse(authorId));
		dto.setTotalRating(courseRepository.totalRating(authorId));
		dto.setInstructorRating(courseRepository.instructorRating(authorId));
		dto.setTotalStudents(courseRepository.totalStudents(authorId));
		listDTO.add(dto);
		return listDTO;
	}


	public AuthorDTO getInfoAuthor(Integer author_id) {
		AuthorDTO dto = new AuthorDTO();
		Author entity = new Author();
		try {
			entity = authorRepository.getById(author_id);
			BeanUtils.copyProperties(entity, dto);
		} catch (Exception e) {
			return null;
		}
		return dto;
	}

}
