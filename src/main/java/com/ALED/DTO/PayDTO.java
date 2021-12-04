package com.ALED.DTO;

import lombok.Data;

@Data
public class PayDTO {
	
	private String description;

	private Double price;
	
	private Integer user_id;
	
	private Integer course_id;

	private String type;
	
	private String bankcode;

}
