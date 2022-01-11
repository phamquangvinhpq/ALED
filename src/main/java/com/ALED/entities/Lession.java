package com.ALED.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;

import lombok.Data;


/**
 * The persistent class for the lession database table.
 * 
 */
@Entity
@NamedQuery(name="Lession.findAll", query="SELECT l FROM Lession l")
@Data
public class Lession implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	@Column(name="link_video")
	private String linkVideo;

	private String name;
	
	private String type;

	private int status;
	//bi-directional many-to-one association to Section
	@ManyToOne
	@JoinColumn(name = "section_id")
	private Section section;

	//bi-directional many-to-one association to Note
//	@OneToMany(mappedBy="lession")
//	private List<Note> notes;
	
	private int demo;


}