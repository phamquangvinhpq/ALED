package com.ALED.DTO;

import java.io.Serializable;

import lombok.Data;

@Data
public class FavoriteDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private int id;
	
	private int status;

	private int user_id;

	private int course_id;
	
	private String course_name;

}
