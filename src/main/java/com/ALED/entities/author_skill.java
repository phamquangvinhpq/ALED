package com.ALED.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class author_skill implements Serializable {/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private String skill;

	@ManyToOne
	@JoinColumn(name = "author_id")
	private Author author;
	
}