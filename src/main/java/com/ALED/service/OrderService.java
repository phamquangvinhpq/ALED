package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ALED.DTO.CourseDTO;
import com.ALED.DTO.OrderDTO;
import com.ALED.entities.Course;
import com.ALED.entities.Orders;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.OrderRepository;
import com.ALED.repositories.UserRepository;

@Service
public class OrderService implements IOrderService {
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	CourseRepository courseRepository;

	@Override
	public OrderDTO create(OrderDTO OrderDTO) {
		Orders Order = new Orders();

		BeanUtils.copyProperties(OrderDTO, Order);
		Order.setUser(userRepository.getById(OrderDTO.getUser()));
		orderRepository.save(Order);
		return OrderDTO;
	}

	@Override
	public List<OrderDTO> readallbyid(Integer user_id) {
		List<OrderDTO> dtoList = new ArrayList<OrderDTO>();
		List<Orders> entityList = orderRepository.findByOrder(user_id);
		for (Orders entity : entityList) {
			OrderDTO dto = new OrderDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setUser(entity.getUser().getId());
			dtoList.add(dto);
		}
		return dtoList;
	}

	@Override
	public List<OrderDTO> getAll() {
		List<OrderDTO> dtoList = new ArrayList<OrderDTO>();
		List<Orders> entityList = orderRepository.findAll();
		for (Orders entity : entityList) {
			OrderDTO dto = new OrderDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setUser(entity.getUser().getId());
			dtoList.add(dto);
		}
		return dtoList;
	}
	
	@Override
	public List<OrderDTO> findpage(Integer userId,int page, int size) {
		List<Orders> courses = new ArrayList<Orders>();
		List<OrderDTO> courseDTOs = new ArrayList<OrderDTO>();
		Pageable pageable = PageRequest.of(page, size);
		Page<Orders> paging =   orderRepository.findByOrderPage(userId, pageable);
		courses = paging.getContent();
		for (Orders course : courses) {
			OrderDTO dto = new OrderDTO();
			BeanUtils.copyProperties(course, dto);
			dto.setUser(course.getUser().getId());
			courseDTOs.add(dto);
		
		}
		
		return courseDTOs;
	}
	
	@Override
	public List<OrderDTO> getAllByPage(int page, int size) {
		List<Orders> courses = new ArrayList<Orders>();
		List<OrderDTO> courseDTOs = new ArrayList<OrderDTO>();
		Pageable pageable = PageRequest.of(page, size);
		Page<Orders> paging =  (Page<Orders>) orderRepository.findAll(pageable);
		courses = paging.getContent();
		for (Orders course : courses) {
			OrderDTO dto = new OrderDTO();
			BeanUtils.copyProperties(course, dto);
			dto.setUser(course.getUser().getId());
			courseDTOs.add(dto);
		}
		return courseDTOs;
	}

}
