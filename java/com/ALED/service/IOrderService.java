package com.ALED.service;

import java.util.List;

import com.ALED.DTO.OrderDTO;


public interface IOrderService {
	public OrderDTO create(OrderDTO orderDTO);
	public List<OrderDTO> readallbyid(Integer id);

}
