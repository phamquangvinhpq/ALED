package com.ALED.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the choice database table.
 * 
 */
@Entity
@Table(name = "choice")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Choice implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank(message = "không được để trống đáp án")
	@NotNull(message = "không được để trống đáp án")
	@Column(name = "choice_text")
	private String choiceText;



	@NotNull(message = "chọn đáp án đúng")
	@Column(name = "corrected")
	private int isCorrected;

	

}