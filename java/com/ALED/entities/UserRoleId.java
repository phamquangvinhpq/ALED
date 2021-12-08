package com.ALED.entities;

import java.io.Serializable;

import lombok.Data;

@Data
public class UserRoleId implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer role;
	private Integer user;
}
