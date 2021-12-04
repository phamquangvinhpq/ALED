package com.ALED.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the note database table.
 * 
 */

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Note implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String note;

	private Integer lession_id;

	private Integer users_id;

//	@ManyToOne
//	@JoinColumn(name = "lession_id")
//	private Lession lession;
//
//	@OneToOne
//	@JoinColumn(name="users_id")
//	private Users user;

}