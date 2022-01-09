package com.ALED.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	
	private String photo;
	
	private String type;

	private String image;

	private String name;
	


	// bi-directional many-to-one association to Course
	@OneToMany(mappedBy = "author")
	private List<Course> courses;

//	 bi-directional many-to-one association to AuthorSkill
	@JsonIgnore
	@OneToMany(mappedBy="author")
	private List<author_skill> authorSkills;

}