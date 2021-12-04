package com.ALED.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.MycourseDTO;
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
	public List<MycourseDTO> readallbyid(Integer id) {
		List<MycourseDTO> MycourseDTO = new ArrayList<MycourseDTO>();
		List<Mycourse> Mycourses = mycourseRepository.findbymycourse(id);
		for (Mycourse Mycourse : Mycourses) {
			MycourseDTO DTO = new MycourseDTO();
			BeanUtils.copyProperties(Mycourse, DTO);
			DTO.setUsers(Mycourse.getUser().getId());
			DTO.setCourse(Mycourse.getCourse().getId());
			DTO.setName(Mycourse.getCourse().getCourseName());
			DTO.setDescription(Mycourse.getCourse().getDescription());
			DTO.setImage(Mycourse.getCourse().getImage());
			MycourseDTO.add(DTO);
		}
		return MycourseDTO;
	}
	





	

}
