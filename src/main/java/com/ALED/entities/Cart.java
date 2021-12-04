package com.ALED.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;

import com.fasterxml.jackson.annotation.JsonIgnore;import com.fasterxml.jackson.core.sym.Name;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * The persistent class for the cart database table.
 * 
 */

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@NamedQuery(name="Cart.findAll", query="SELECT c FROM Cart c")
public class Cart implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String image;

	private Double price;
	

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users users;

	//bi-directional many-to-one association to Course
	@ManyToOne
	private Course course;	

	

}