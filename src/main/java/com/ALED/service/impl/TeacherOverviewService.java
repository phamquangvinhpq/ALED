package com.ALED.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.AuthorDTO;
import com.ALED.DTO.TeacherOverviewDTO;
import com.ALED.entities.Author;
import com.ALED.entities.author_skill;
import com.ALED.repositories.AuthorRepository;
import com.ALED.repositories.AuthorSkillRepository;
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
	
	@Autowired
	AuthorSkillRepository authorSkillRepository;
	

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
		author_skill skill=authorSkillRepository.getById(author_id);
		
			entity = authorRepository.getById(author_id);
			dto.setId(entity.getId());
			dto.setDescription(entity.getDescription());
			dto.setEducation(entity.getEducation());
			dto.setImage(entity.getImage());
			dto.setName(entity.getName());
			dto.setType(entity.getType());
			dto.setSkill(skill.getSkill());
			
		
		return dto;
	}

}
