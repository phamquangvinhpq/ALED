package com.ALED.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.ContentQADTO;
import com.ALED.entities.ContentQA;
import com.ALED.entities.QA;
import com.ALED.repositories.ContentQARepository;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.QARepository;
import com.ALED.repositories.UserRepository;
import com.ALED.service.IContentQAService;

@Service
public class ContentQAService implements IContentQAService {

	@Autowired
	private ContentQARepository contentQARepository;

	@Autowired
	private QARepository qARepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CourseRepository courseRepository;

	private java.util.Date getTime() {
		Calendar calendar = Calendar.getInstance();
		java.util.Date currentTime = calendar.getTime();
		return currentTime;
	}

	@Override
	public List<ContentQADTO> getAllContentAuthor(Integer qa_id) {
		List<ContentQA> listEntity = contentQARepository.findAll();
		List<ContentQADTO> listDto = new ArrayList<ContentQADTO>();
		for (ContentQA contentQA : listEntity) {
			if (contentQA.getQa().getId() == qa_id) {
				ContentQADTO dto2 = new ContentQADTO();
				BeanUtils.copyProperties(contentQA, dto2);
				dto2.setQa_id(contentQA.getQa().getId());
				dto2.setTime(contentQA.getCreate_date().toString());
				dto2.setUser_name(contentQA.getQa().getUsers().getName());
				dto2.setAuthor_name(contentQA.getQa().getCourse().getAuthor().getName());
				dto2.setCourse_name(contentQA.getQa().getCourse().getCourseName());
				listDto.add(dto2);
			}
		}
		return listDto;
	}

	@Override
	public List<ContentQADTO> getAllContentStudent(Integer users_id, Integer course_id) {
		Integer qa_id = qARepository.getIDByUserAndCourse(users_id, course_id);
		return getAllContentAuthor(qa_id);
	}

	@Override
	public ContentQADTO saveAuthor(ContentQADTO dto) {
		QA entityQA = qARepository.findByUserAndCourse(dto.getUser_id(), dto.getCourse_id());
		if (entityQA != null) {
			entityQA.setStatus(1);
			qARepository.save(entityQA);

			ContentQA entityContentQA = new ContentQA();
			entityContentQA.setQa(entityQA);
			BeanUtils.copyProperties(dto, entityContentQA);
			
			entityContentQA.setCreate_date(getTime());
			
			contentQARepository.save(entityContentQA);
			dto.setId(entityContentQA.getId());
			dto.setQa_id(entityQA.getId());
			return dto;
		} else {
			QA entityQA2 = new QA();
			entityQA2.setUsers(userRepository.getById(dto.getUser_id()));
			entityQA2.setCourse(courseRepository.getById(dto.getCourse_id()));
			entityQA2.setStatus(1);
			qARepository.save(entityQA2);

			ContentQA entityContentQA = new ContentQA();
			entityContentQA.setQa(entityQA2);
			BeanUtils.copyProperties(dto, entityContentQA);

			entityContentQA.setCreate_date(getTime());

			contentQARepository.save(entityContentQA);
			dto.setId(entityContentQA.getId());
			dto.setQa_id(entityQA2.getId());
			return dto;
		}
	}

	@Override
	public ContentQADTO saveStudent(ContentQADTO dto) {
		QA entityQA = qARepository.findByUserAndCourse(dto.getUser_id(), dto.getCourse_id());
		if (entityQA != null) {
			entityQA.setStatus(0);
			qARepository.save(entityQA);

			ContentQA entityContentQA = new ContentQA();
			entityContentQA.setQa(entityQA);
			BeanUtils.copyProperties(dto, entityContentQA);

			entityContentQA.setCreate_date(getTime());

			contentQARepository.save(entityContentQA);
			dto.setId(entityContentQA.getId());
			dto.setQa_id(entityQA.getId());
			return dto;
		} else {
			QA entityQA2 = new QA();
			entityQA2.setUsers(userRepository.getById(dto.getUser_id()));
			entityQA2.setCourse(courseRepository.getById(dto.getCourse_id()));
			entityQA2.setStatus(0);
			qARepository.save(entityQA2);

			ContentQA entityContentQA = new ContentQA();
			entityContentQA.setQa(entityQA2);
			BeanUtils.copyProperties(dto, entityContentQA);
			
			entityContentQA.setCreate_date(getTime());
			
			contentQARepository.save(entityContentQA);
			dto.setId(entityContentQA.getId());
			dto.setQa_id(entityQA2.getId());
			return dto;
		}
	}

}
