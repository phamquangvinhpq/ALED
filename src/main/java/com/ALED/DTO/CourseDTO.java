package com.ALED.DTO;



import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class CourseDTO {

	private Integer id;
	
	@NotNull
	@Size(min = 2, message = "lớn hơn 2 ký tự")
	private String courseName;
	
	@NotNull(message = "nhập mô tả")
	private String description;

	@NotNull
	@Size(min = 2, message = "lớn hơn 2 ký tự")
	private Double price;

	@NotNull(message = "nhập mô tả")
	private String image;

	@NotNull(message = "nhập mô tả")
	private Integer status;
	
	@NotNull(message = "nhập mô tả")
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
