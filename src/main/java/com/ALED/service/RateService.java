package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ALED.DTO.RateDTO;
import com.ALED.DTO.SectionDTO;
import com.ALED.DTO.UserRateDTO;
import com.ALED.entities.Orders;
import com.ALED.entities.Rate;
import com.ALED.entities.Users;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.RateRepository;
import com.ALED.repositories.UserRepository;

@Service
public class RateService implements IRateService {

	@Autowired
	private RateRepository rateRepository;
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private UserRepository userRepository;

	@Override
	public SectionDTO create(RateDTO rateDTO) {

		return null;
	}

	@Override
	public RateDTO update(RateDTO rateDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<UserRateDTO> detailcour(Integer id, int page, int size) {
		List<Rate> rates = new ArrayList<Rate>();
		List<UserRateDTO> dtos = new ArrayList<UserRateDTO>();
		Pageable pageable = PageRequest.of(page, size);
		Page<Rate> page2;
		if(id == null) {
			page2 = rateRepository.findAll(pageable);
		}else {
			page2 = rateRepository.findbymycourse(id, pageable);
			rates = page2.getContent();
			for (Rate rate : page2) {
				UserRateDTO DTO = new UserRateDTO();
				BeanUtils.copyProperties(rate, DTO);
				DTO.setCourse(rate.getCourse().getId());
				int iduser = rate.getUser().getId();
				Optional<Users> name =userRepository.findById(iduser);
				DTO.setUser(name.get().getName());
				dtos.add(DTO);
			}
		}
		return dtos;

	}

	@Override
	public String avgstar(Integer id) {

		String Rate = rateRepository.findbyavg(id);

		return Rate;
	}

	@Override
	public String count(Integer id) {
		String count = rateRepository.findcount(id);

		return count;
	}

	@Override
	public RateDTO save(RateDTO rateDTO) {

		Rate rate = new Rate();

		BeanUtils.copyProperties(rateDTO, rate);

		rate.setCourse(courseRepository.getById(rateDTO.getCourse()));
		rate.setUser(userRepository.getById(rateDTO.getUser()));
		rateRepository.save(rate);
		return rateDTO;
	}

	@Override
	public String findbyrate(Integer userid, Integer courseid) {
		String Rate = rateRepository.findbyrate(userid,courseid);
		if(Rate == null)
		{
			return "no";
		}
		return "yes";
	}

}
