package com.ALED.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * The persistent class for the exam_user database table.
 * 
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exam_user")
public class ExamUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@JsonIgnore
	@Column(name = "answer_sheet", columnDefinition = "text")
	private String answerSheet;

	@Column(name = "is_finished", columnDefinition = "TINYINT")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private Boolean isFinished = false;

	@Column(name = "is_started", columnDefinition = "TINYINT")
	@Type(type = "org.hibernate.type.NumericBooleanType")
	private Boolean isStarted = false;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "time_finish")
	private Date timeFinish;

	@Column(name = "time_start")
	@Temporal(TemporalType.TIMESTAMP)
	Date timeStart;

	@Column(name = "total_point")
	private Double totalPoint;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "exam_id")
	private Exam exam;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "user_id")
	private Users user;

	private Integer course_id;
}