package com.ALED.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.TeacherOverviewDTO;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.MycourseRepository;
import com.ALED.service.ITeacherOverviewService;

@Service
public class TeacherOverviewService implements ITeacherOverviewService{
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	MycourseRepository mycourseRepository;
	

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

}
