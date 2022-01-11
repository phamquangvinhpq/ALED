package com.ALED.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class SectionDTO {

	private int id;
	
	@NotBlank(message = "Tên chương không được để trống")
	@Size(min = 5 , message = "Tên chương phải ít nhất 5 ký tự")
	private String name;
	
	private int Course_id;

}
