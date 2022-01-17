package com.ALED.DTO;



import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
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

	@NotNull(message = "nhập giá")
	@Size(min = 2, message = "lớn hơn 2 ký tự")
	private Double price;

	@NotNull(message = "chọn ảnh")
	private String image;

	@NotNull(message = "nhập mô tả")
	private Integer status;
	
	@NotNull(message = "chọn danh mục")
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
	
	private String create_date;
	
//	@Min(value = 0, message = "Giảm giá chỉ từ 0 - 100")
//    @Max(value = 100, message = "Giảm giá chỉ từ 0 - 100")
	private Integer discount;
	
	private Double price_discount;
	private String email;

}
