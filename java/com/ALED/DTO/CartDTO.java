package com.ALED.DTO;

import lombok.Data;

@Data
public class CartDTO {

	private int id;

	private String image;

	private Double price;
	
	private int user_id;
	
	private int course_id;
}
