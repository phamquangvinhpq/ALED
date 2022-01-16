package com.ALED.DTO;

import lombok.Data;

@Data
public class ReportDTO {

	private Integer id;
	
	private String content;
	
	private String type;
	
	private String linkVideo;
	
	private String create_date;
	
	private Integer status;
	
	private String course_name;
	
	private Integer course_id;
	
	private Integer users_id;
	
	private String user_name;
	
	private String email;
}
