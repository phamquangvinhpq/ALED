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
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;


/**
 * The persistent class for the course database table.
 * 
 */
@Entity
@Data
@NamedQuery(name="Course.findAll", query="SELECT c FROM Course c")
public class Course implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="course_name")
	private String courseName;

	private String description;

	private Double price;

	private String image;
	
	private Integer status;
	
	private String type;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date create_date;
	
	private Integer discount;

	//bi-directional many-to-one association to Category
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	//bi-directional many-to-one association to Author
	@ManyToOne
	@JoinColumn(name = "author_id")
	private Author author;
	
	
	@OneToMany(mappedBy="course",cascade = CascadeType.REMOVE)
	private List<Section> sections;
	
	
	@OneToMany(mappedBy = "course")
	private List<Course> course;


	@OneToMany(mappedBy="course")
	private List<Mycourse> mycourses;
	

	@ManyToOne
	@JoinColumn(name = "users_id")
	private Users users;

	@OneToMany(mappedBy="course")
	private List<QA> qas;


}