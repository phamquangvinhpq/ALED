package com.ALED.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * The persistent class for the question database table.
 * 
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "question")
public class Question implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "deleted")
	private boolean deleted = false;


	@NotNull(message = "Vui lòng nhập điểm")
	@Column(name = "point")
	private int point;

	@NotBlank(message = "Vui lòng nhập câu hỏi")
	@NotNull(message = "Vui lòng nhập câu hỏi")
	@Column(name = "question_text", columnDefinition = "text")
	private String questionText;
	
	
	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "question_type_id")
	private QuestionType questionType;
	
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "question_id")
	private List<Choice> choices;


	@ManyToOne()
	@JoinColumn(name = "Section_id")
	private Section section;

}