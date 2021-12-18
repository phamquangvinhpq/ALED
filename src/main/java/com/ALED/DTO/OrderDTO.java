package com.ALED.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class OrderDTO {

	private int id;
	
	private String bank;

	private Date createDate;

	private int monny;

	private String mota;

	private int status;

	private int user;

	private String courseName;
}
