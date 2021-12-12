package com.ALED.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.StudentOverviewDTO;
import com.ALED.entities.Mycourse;
import com.ALED.entities.Rate;
import com.ALED.repositories.MycourseRepository;
import com.ALED.repositories.RateRepository;
import com.ALED.service.IStudentOverviewService;

@Service
public class StudentOverviewService implements IStudentOverviewService{
	
	@Autowired
	private MycourseRepository mycourseRepository;
	
	@Autowired
	private RateRepository rateRepository;
	

	@Override
	public StudentOverviewDTO getInfo(Integer user_id) {
		StudentOverviewDTO dto = new StudentOverviewDTO();
		List<Mycourse> entities = mycourseRepository.findAll();
		List<Rate> entitiesRate = rateRepository.findAll();
		Integer totalCourse = 0;
		float totalMoneySpent = 0;
		Integer totalRatingGiven = 0;
		for (Mycourse entity : entities) {
			if (entity.getUser().getId() == user_id) {
				totalCourse+=1;
				totalMoneySpent += entity.getCourse().getPrice();
			}
		}
		for (Rate entity : entitiesRate) {
			if (entity.getUser().getId() == user_id) {
				totalRatingGiven+=1;
			}
		}
		dto.setTotalCourse(totalCourse);
		dto.setTotalMoneySpent(totalMoneySpent);
		dto.setTotalRatingGiven(totalRatingGiven);
		return dto;
	}

}
