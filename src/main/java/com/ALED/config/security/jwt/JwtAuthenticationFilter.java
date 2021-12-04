package com.ALED.config.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ALED.config.security.service.CustomUserDetails;
import com.ALED.config.security.service.CustomUserDetailsService;
import com.ALED.enums.AppConts;

import io.jsonwebtoken.ExpiredJwtException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtAuthenticationProvider authenticationProvider;
	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	/*
	 * kiểm tra request của người dùng trước khi nó tới đích
	 * lấy Header Authorization ra và kiểm tra xem chuỗi JWT người dùng gửi lên có hợp lệ không
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			// Lấy jwt từ request
			String jwt = getJWTToken(request);
			if (StringUtils.hasText(jwt) && AppConts.TokenStatus.OK.equals(authenticationProvider.validatToken(jwt))) {
				// Lấy user từ chuỗi jwt
				String username = authenticationProvider.getUsernameFromToken(jwt);
				if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
					  // Nếu người dùng hợp lệ, set thông tin cho Seturity Context
					CustomUserDetails user = (CustomUserDetails) customUserDetailsService.loadUserByUsername(username);
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user,
							user, user.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}
			filterChain.doFilter(request, response);
		} catch (ExpiredJwtException e) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		} catch (AccessDeniedException e) {
			response.sendError(HttpServletResponse.SC_FORBIDDEN);
		}
	}

	private String getJWTToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		// Kiểm tra xem header Authorization có chứa thông tin jwt không
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			String jwt = bearerToken.substring(7, bearerToken.length());
			return jwt;
		}
		return null;
	}

}
