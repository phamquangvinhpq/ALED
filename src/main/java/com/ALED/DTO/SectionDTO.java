package com.ALED.DTO;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class SectionDTO {

	private int id;
	
	@NotNull
	@Size(min = 2, message = " lớn hơn 2 ký tự")
	private String name;
	
	
	private int Course_id;

}
