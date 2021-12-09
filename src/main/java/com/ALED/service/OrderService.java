package com.ALED.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.OrderDTO;
import com.ALED.entities.Orders;
import com.ALED.repositories.OrderRepository;
import com.ALED.repositories.UserRepository;

@Service
public class OrderService implements IOrderService {
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public OrderDTO create(OrderDTO OrderDTO) {
		Orders Order = new Orders();

		BeanUtils.copyProperties(OrderDTO, Order);
		Order.setUser(userRepository.getById(OrderDTO.getUser()));
		orderRepository.save(Order);
		return OrderDTO;
	}

	@Override
	public List<OrderDTO> readallbyid(Integer id) {
		List<OrderDTO> OrderDTO = new ArrayList<OrderDTO>();
		List<Orders> Orders = orderRepository.findbyorder(id);
		for (Orders Order : Orders) {
			OrderDTO DTO = new OrderDTO();
			BeanUtils.copyProperties(Order, DTO);
			DTO.setBank(Order.getBank());
			DTO.setMonny(Order.getMonny());
			DTO.setMota(Order.getMota());
			DTO.setStatus(Order.getStatus());
			DTO.setCreateDate(Order.getCreateDate());
			DTO.setUser(Order.getUser().getId());
			OrderDTO.add(DTO);
		}
		return OrderDTO;
	}

}
