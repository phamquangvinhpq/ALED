package com.ALED.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ALED.DTO.CartDTO;
import com.ALED.entities.Cart;
import com.ALED.service.FileService;
import com.ALED.service.ICartService;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	ICartService cartService;
	
	@Value("${server.url}")
	private String serverUrl;

	@Value("${server.proto}")
	private String serverProto;

	@Autowired
	private FileService fileService;

	
	@GetMapping("/{user_id}")
	public List<CartDTO> getAll(@PathVariable Integer user_id){
		return cartService.getAll(user_id);
	}
	
	@PostMapping("/add")
	public CartDTO save(@RequestBody CartDTO cartDTO) {
		return cartService.save(cartDTO);
	}
	
	@DeleteMapping("/delete/{id}")
	public CartDTO delete(@PathVariable Integer id) {
		return cartService.delete(id);
	}
}
