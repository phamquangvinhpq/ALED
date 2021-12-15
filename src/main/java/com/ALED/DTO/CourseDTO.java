package com.ALED.DTO;

import lombok.Data;

@Data
public class CourseDTO {

	private Integer id;

	private String courseName;

	private String description;

	private Double price;

	private String image;

	private Integer status;

	private Integer category_id;

	private Integer author_id;

	private Integer user_id;
	private String type;
	
	private String rate;
	
	private String userName;
	
	private String categoryName;
	
	private String authorName;
	
	private String imageAuthor;
	
	private Integer countChapter;


}
