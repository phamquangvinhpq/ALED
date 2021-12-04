package com.ALED.config.security.jwt;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.ALED.config.security.service.CustomUserDetails;
import com.ALED.enums.AppConts;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtAuthenticationProvider {

	private final static String SPACE = " ";
	@Value("${jwt.token.secret}")
	private String secret;
	
	//Thời gian có hiệu lực của chuỗi jwt
	@Value("${jwt.token.exp}")
	private int expTime;
	
	// Tạo ra jwt từ thông tin user
	public String generateToken(Authentication authentication) {
		CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

		Date date = new Date();
		Date expDate = new Date(date.getTime() + expTime);

		return Jwts.builder().setSubject(user.getUsername()).setIssuedAt(date).setExpiration(expDate)
				.signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, secret).compact();
	}
	// Lấy thông tin user từ jwt
	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
		return claims.getSubject().split(SPACE)[0];
	}
	// validate Token được gửi lên
	public String validatToken(String authenToken) {
		try {
			if (authenToken.isBlank()) {
				return AppConts.TokenStatus.INVALID;
			}
			return AppConts.TokenStatus.OK;
		} catch (io.jsonwebtoken.SignatureException e) {
			return AppConts.TokenStatus.INVALID;
		} catch (MalformedJwtException e) {
			return AppConts.TokenStatus.MALFORMED;
		} catch (ExpiredJwtException e) {
			return AppConts.TokenStatus.EXP;
		} catch (UnsupportedJwtException e) {
			return AppConts.TokenStatus.UN_SUPPORT;
		} catch (IllegalArgumentException e) {
			return AppConts.TokenStatus.ILLEGAL;
		}
	}
}
