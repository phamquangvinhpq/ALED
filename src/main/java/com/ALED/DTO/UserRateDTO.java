package com.ALED.DTO;

import lombok.Data;

@Data
public class UserRateDTO {
	
	private int id;

	private String comment;

	private float rate;

	private int course;
	
	private int soluong;

	private String user;
}
