package com.ALED.config.security.auth;

import java.util.List;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {

	private String fullName;
	private Integer id;
	private String accessToken;
	private String username;
	private List<String> roles;
}
