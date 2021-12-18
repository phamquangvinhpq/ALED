package com.ALED.DTO;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class CategoryDTO {

	private int id;
	
	@NotNull
	@Size(min = 3, message = "lớn hơn 2 ký tự")
	private String name;
	
	private Integer countCourse;
}