package com.ALED.DTO;

import java.io.Serializable;

import lombok.Data;

@Data
public class NoteDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer id;

	private String note;

	private Integer lession_id;

	private Integer users_id;

}