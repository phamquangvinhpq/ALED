package com.ALED.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * The persistent class for the user_course database table.
 * 
 */

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user_course")
@NamedQuery(name="UserCourse.findAll", query="SELECT u FROM UserCourse u")
public class UserCourse implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private int status;

	//bi-directional many-to-one association to User
	@ManyToOne
	private Users user;

	//bi-directional many-to-one association to Course
	@ManyToOne
	private Course course;

	

}