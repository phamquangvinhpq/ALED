package com.ALED.config.security.auth;

import lombok.Data;

@Data
public class LoginRequest {

	private String username;
	private String password;

}
