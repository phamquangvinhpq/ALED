package com.ALED.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ALED.DTO.CourseDTO;
import com.ALED.DTO.MycourseDTO;
import com.ALED.entities.Course;
import com.ALED.entities.Mycourse;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.MycourseRepository;
import com.ALED.repositories.UserRepository;
@Service
public class MycourseService implements IMycourseService {

	
	@Autowired
	private MycourseRepository mycourseRepository;
	
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	UserRepository userRepository;


	
	@Override
	public MycourseDTO create(MycourseDTO MycourseDTO) {
		Mycourse Mycourse = new Mycourse();
		
		BeanUtils.copyProperties(MycourseDTO, Mycourse);
		
		Mycourse.setCourse(courseRepository.getById(MycourseDTO.getCourse()));
		
		Mycourse.setUser(userRepository.getById(MycourseDTO.getUsers()));
		
		mycourseRepository.save(Mycourse);
		return MycourseDTO;
	}

	@Override
	public List<MycourseDTO> readallbyid(Integer id,int page,int size) {
		
		List<Mycourse> Mycourses = new ArrayList<Mycourse>();
		List<MycourseDTO> MycourseDTO = new ArrayList<MycourseDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Mycourse> pageCourses = mycourseRepository.findbymycourse(id,paging);
		Mycourses = pageCourses.getContent();
		for (Mycourse entity : Mycourses) {
			MycourseDTO DTO = new MycourseDTO();
			BeanUtils.copyProperties(entity, DTO);
			DTO.setUsers(entity.getUser().getId());
			DTO.setCourse(entity.getCourse().getId());
			DTO.setName(entity.getCourse().getCourseName());
			DTO.setDescription(entity.getCourse().getDescription());
			DTO.setImage(entity.getCourse().getImage());
			MycourseDTO.add(DTO);
		}
		return MycourseDTO;
	}
	





	

}
