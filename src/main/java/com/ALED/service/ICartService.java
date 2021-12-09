package com.ALED.service;

import java.util.List;

import com.ALED.DTO.CartDTO;
import com.ALED.entities.Cart;

public interface ICartService {

	List<CartDTO> getAll(Integer user_id);
	CartDTO save(CartDTO cart);
	CartDTO delete(Integer id);
	
}
