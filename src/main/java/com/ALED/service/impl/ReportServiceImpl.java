package com.ALED.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ALED.DTO.ReportDTO;
import com.ALED.entities.Report;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.ReportRepository;
import com.ALED.repositories.UserRepository;
import com.ALED.service.IReportService;
@Service
public class ReportServiceImpl implements IReportService{

	@Autowired
	private ReportRepository reportRepository;
	
	@Autowired
	public JavaMailSender emailSender;
	
	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public ReportDTO convertToDTO(Report entity) {
		ReportDTO dto = new ReportDTO();
		BeanUtils.copyProperties(entity, dto);
		dto.setCreate_date(entity.getCreate_date().toString());
		dto.setCourse_name(entity.getCourse().getCourseName());
		dto.setCourse_id(entity.getCourse().getId());
		dto.setUser_name(entity.getUsers().getName());
		dto.setUsers_id(entity.getUsers().getId());
		dto.setEmail(entity.getUsers().getEmail());
		return dto;
	}
	
	public Report convertToEntity(ReportDTO dto) {
		Report entity = new Report();
		BeanUtils.copyProperties(dto, entity);
		entity.setCourse(courseRepository.getById(dto.getCourse_id()));
		entity.setUsers(userRepository.getById(dto.getUsers_id()));
		return entity;
	}
	
	private java.util.Date getTime() {
		Calendar calendar = Calendar.getInstance();
		java.util.Date currentTime = calendar.getTime();
		return currentTime;
	}
	
	@Override
	public List<ReportDTO> getAllDtos(Integer page, Integer size) {
		List<ReportDTO> listDto = new ArrayList<ReportDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Report> pageCourses = reportRepository.findAll(paging);
		List<Report> listEnity = pageCourses.getContent();
		for (Report entity : listEnity) {
			ReportDTO dto = convertToDTO(entity);
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public List<ReportDTO> getByStatus(Integer status, Integer page, Integer size) {
		List<ReportDTO> listDto = new ArrayList<ReportDTO>();
		Pageable paging = PageRequest.of(page, size);
		Page<Report> pageCourses = reportRepository.findAllByStatus(status, paging);
		List<Report> listEnity = pageCourses.getContent();
		for (Report entity : listEnity) {
			ReportDTO dto = convertToDTO(entity);
			listDto.add(dto);
		}
		return listDto;
	}

	@Override
	public ReportDTO create(ReportDTO dto) {
		Report entity = convertToEntity(dto);
		entity.setCreate_date(getTime());
		reportRepository.save(entity);
		return convertToDTO(entity);
	}

	@Override
	public void guiMail(String email, String loiNhan, Integer id) {
		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(email);
		message.setSubject("THÔNG BÁO VỀ ĐƠN BÁO CÁO NỘI DUNG VIDEO");
		message.setText(loiNhan);

		// Send Message!
		emailSender.send(message);
		Report entity = reportRepository.getById(id);
		entity.setStatus(1);
		reportRepository.save(entity);
		
	}

}
