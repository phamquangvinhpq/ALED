package com.ALED.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * The persistent class for the section database table.
 * 
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@NamedQuery(name="Section.findAll", query="SELECT s FROM Section s")
public class Section implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String name;

	//bi-directional many-to-one association to Lession
	@JsonIgnore
	@OneToMany(mappedBy="section")
	private List<Lession> lessions;

	//bi-directional many-to-one association to Course
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;

	
}