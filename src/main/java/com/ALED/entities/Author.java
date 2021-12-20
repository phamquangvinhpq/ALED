package com.ALED.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the author database table.
 * 
 */

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@NamedQuery(name = "Author.findAll", query = "SELECT a FROM Author a")
public class Author implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id

	private Integer id;

	private String description;

	private String education;

	private String image;

	private String name;

	// bi-directional many-to-one association to Course
	@OneToMany(mappedBy = "author")
	private List<Course> courses;

	// bi-directional many-to-one association to AuthorSkill
//	@OneToMany(mappedBy="author")
//	private List<AuthorSkill> authorSkills;

}