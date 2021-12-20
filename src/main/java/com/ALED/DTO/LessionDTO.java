package com.ALED.DTO;

import java.io.Serializable;

import lombok.Data;

@Data
public class LessionDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private int id;

	private String linkVideo;

	private String name;
	
	private String type;
	
	private int section_id;
	
	private int status;
	
	private int Courseid;
	


}