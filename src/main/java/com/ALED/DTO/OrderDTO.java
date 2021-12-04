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

	//bi-directional many-to-one association to User

	private int user;

//	//bi-directional many-to-one association to OrderDetail
//	@OneToMany(mappedBy="order")
//	private List<OrderDetail> orderDetails;

}
