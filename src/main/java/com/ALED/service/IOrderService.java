package com.ALED.service;

import java.util.List;

import com.ALED.DTO.OrderDTO;


public interface IOrderService {
	public OrderDTO create(OrderDTO orderDTO);
	public List<OrderDTO> readallbyid(Integer id);
	public List<OrderDTO> getAll();
	List<OrderDTO> getAllByPage(int page, int size);
	List<OrderDTO> findpage(Integer userId, int page, int size);

}
