package com.ALED.DTO;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LessionDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private int id;

	private String linkVideo;
	
	private String time;

	@NotBlank(message = "Tên bài học không được để trống")
    @Min(value = 8, message = "Tên bài học phải từ 8 kí tự trở lên")
	private String name;

	private String type;

	private int section_id;

	private int status;
	
	private int Courseid;
	
	private int demo;

}