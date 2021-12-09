package com.ALED.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity(name = "userrole")
@IdClass(UserRoleId.class)
public class UserRole implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "roleId")
	private Role role;

	@JsonIgnore
	@Id
	@ManyToOne
	@JoinColumn(name = "userId")
	private Users user;

	

}
