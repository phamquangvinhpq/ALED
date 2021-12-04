package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.CartDTO;
import com.ALED.entities.Cart;
import com.ALED.repositories.CartRepository;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.UserRepository;

@Service
public class CartService implements ICartService {

	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public List<CartDTO> getAll(Integer user_id) {
		List<CartDTO> dtos = new ArrayList<CartDTO>();
		List<Cart> carts = cartRepository.timuse(user_id);
		for (Cart cart : carts) {
			CartDTO cartDTO = new CartDTO();
			BeanUtils.copyProperties(cart, cartDTO);
			cartDTO.setCourse_id(cart.getCourse().getId());
			cartDTO.setUser_id(cart.getUsers().getId());
			dtos.add(cartDTO);
		}
		return dtos;
	}
	
	@Override
	public CartDTO save(CartDTO cartDTO) {
		Cart cart = new Cart();
		BeanUtils.copyProperties(cartDTO, cart);
		cart.setCourse(courseRepository.getById(cartDTO.getCourse_id()));
		cart.setUsers(userRepository.getById(cartDTO.getUser_id()));
		cart.setImage(cartDTO.getImage());
		cartRepository.save(cart);
		cartDTO.setId(cart.getId());
		return cartDTO;
	}

	@Override
	public CartDTO delete(Integer id) {
		CartDTO cartDTO = new CartDTO();
		Optional<Cart> optional = cartRepository.findById(id);
		if(optional.isPresent()) {
			Cart cart = optional.get();
			BeanUtils.copyProperties(cart, cartDTO);
			cartRepository.delete(cart);
		}
		
		return cartDTO;
	}

}
