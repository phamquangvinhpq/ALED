package com.ALED.DTO;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class SectionDTO {

	private int id;
	
	@NotBlank(message = "Tên chương không được để trống")
    @Min(value = 8, message = "Tên chương phải từ 8 kí tự trở lên")
	private String name;
	
	private int Course_id;

}
