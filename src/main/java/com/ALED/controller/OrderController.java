package com.ALED.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.OrderDTO;
import com.ALED.service.IOrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	@Autowired
	private IOrderService IOrderService;
	
	@GetMapping("/{user_id}")
	public List<OrderDTO> findByUser(@PathVariable Integer user_id) {
		return IOrderService.readallbyid(user_id);
	}
	
	@GetMapping("")
	public List<OrderDTO> getAll() {
		return IOrderService.getAll();
	}
	
	@GetMapping("user/{id}")
	public List<OrderDTO> findByUserbyPage(@PathVariable Integer id,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		return IOrderService.findpage(id,page,size);
	}
	
	@GetMapping("/get-all-by-page")
	public List<OrderDTO> getAllByPage(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		return IOrderService.getAllByPage(page,size);
	}
}
