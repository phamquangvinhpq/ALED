package com.ALED.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * The persistent class for the exam database table.
 */
@Entity
@Table(name = "exam")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exam implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "begin_exam")
	@DateTimeFormat(pattern = "yyyy/MM/dd hh:mm:ss a")
	//	    @Temporal(TemporalType.TIMESTAMP)
	private Date beginExam;

	@Column(name = "canceled")
	private boolean canceled = false;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date")
	private Date createdDate;

	@Column(name = "duration_exam")
	private int durationExam;

	@Column(name = "finish_exam")
	@DateTimeFormat(pattern = "yyyy/MM/dd hh:mm:ss a")
	//	    @Temporal(TemporalType.TIMESTAMP)
	private Date finishExam;

	@Transient
	private boolean locked;

	@Column(name = "question_data", columnDefinition = "text")
	private String questionData;

	@Column(name = "title")
	private String title;

	@ManyToOne()
	@JoinColumn(name = "Section_id")
	private Section section;

	@ManyToOne
	@JoinColumn(name = "created_by_id")
	private Users user;

	// bi-directional many-to-one association to ExamUser
	@JsonIgnore
	@OneToMany(mappedBy = "exam")
	private List<ExamUser> examUsers;

}