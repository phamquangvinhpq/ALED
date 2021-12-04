package com.ALED.config.security.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AccessControllerService {

	public CustomUserDetails getUserDetailSession() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails)
			return (CustomUserDetails) authentication.getPrincipal();
		return null;
	}
}
