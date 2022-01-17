package com.ALED.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.StudentOverviewDTO;
import com.ALED.entities.Mycourse;
import com.ALED.entities.Orders;
import com.ALED.entities.Rate;
import com.ALED.repositories.MycourseRepository;
import com.ALED.repositories.OrderRepository;
import com.ALED.repositories.RateRepository;
import com.ALED.service.IStudentOverviewService;

@Service
public class StudentOverviewService implements IStudentOverviewService{
	
	@Autowired
	private MycourseRepository mycourseRepository;
	
	@Autowired
	private RateRepository rateRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	

	@Override
	public StudentOverviewDTO getInfo(Integer user_id) {
		List<Orders> entityOrder = orderRepository.findAll();
		StudentOverviewDTO dto = new StudentOverviewDTO();
		List<Rate> entitiesRate = rateRepository.findAll();
		Integer totalCourse = 0;
		float totalMoneySpent = 0;
		Integer totalRatingGiven = 0;
		
		for (Orders entity : entityOrder) {
			if (entity.getUser().getId().equals(user_id)) {
				totalCourse+=1;
				totalMoneySpent += entity.getMonny();
			}
		}
		for (Rate entity : entitiesRate) {
			if (entity.getUser().getId().equals(user_id)) {
				totalRatingGiven+=1;
			}
		}
		dto.setTotalCourse(totalCourse);
		dto.setTotalMoneySpent(totalMoneySpent);
		dto.setTotalRatingGiven(totalRatingGiven);
		return dto;
	}

}
