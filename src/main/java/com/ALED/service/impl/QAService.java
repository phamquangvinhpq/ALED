package com.ALED.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.QADTO;
import com.ALED.entities.QA;
import com.ALED.repositories.AuthorRepository;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.QARepository;
import com.ALED.repositories.UserRepository;
import com.ALED.service.IQAService;

@Service
public class QAService implements IQAService {

	@Autowired
	private QARepository qARepository;
	
	@Autowired
	CourseRepository courseRepository;

	@Autowired
	AuthorRepository authorRepository;
	
	@Autowired
	UserRepository userRepository;


	@Override
	public QADTO save(QADTO dto) {
		QA entity = new QA();
		BeanUtils.copyProperties(dto, entity);
		entity.setAuthor(authorRepository.getById(dto.getAuthor_id()));
		entity.setCourse(courseRepository.getById(dto.getCourse_id()));
		entity.setUsers(userRepository.getById(dto.getUsers_id()));
		qARepository.save(entity);
		dto.setId(entity.getId());
		return dto;
	}

	@Override
	public QADTO update(QADTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<QADTO> getAll(QADTO dto) {
		List<QA> listEntity = qARepository.findAll();
		List<QADTO> listDto = new ArrayList<QADTO>();
		for (QA entity : listEntity) {
			if (dto.getUsers_id() == entity.getUsers().getId() && dto.getAuthor_id() == entity.getAuthor().getId()
					&& dto.getCourse_id() == entity.getCourse().getId()) {
				QADTO dto2 = new QADTO();
				BeanUtils.copyProperties(entity, dto2);
				dto2.setAuthor_id(entity.getAuthor().getId());
				dto2.setCourse_id(entity.getCourse().getId());
				dto2.setUsers_id(entity.getUsers().getId());
				dto2.setId(entity.getId());
				listDto.add(dto2);
			}
		}
		return listDto;
	}

}
