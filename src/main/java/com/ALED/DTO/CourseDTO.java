package com.ALED.DTO;



import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class CourseDTO {

	private Integer id;

	@NotNull
	@Size(min = 3, message = "Tên khóa học phải lớn hơn 3 kí tự")
	private String courseName;
	
	@NotNull
	private String description;

	@NotBlank
	@Min(0)
	private Double price;

	@NotNull
	private String image;

	@NotBlank
	private Integer status;

	@NotBlank
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
