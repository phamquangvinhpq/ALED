package com.ALED.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;

import lombok.Data;


/**
 * The persistent class for the mycourse database table.
 * 
 */
@Data
@Entity
@NamedQuery(name="Mycourse.findAll", query="SELECT m FROM Mycourse m")
public class Mycourse implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	//bi-directional many-to-one association to User
	@ManyToOne
	private Users user;

	//bi-directional many-to-one association to Course

	@ManyToOne
	private Course course;


}