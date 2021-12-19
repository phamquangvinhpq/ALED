package com.ALED.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.config.security.auth.JwtAuthenticationResponse;
import com.ALED.config.security.auth.LoginRequest;
import com.ALED.config.security.jwt.JwtAuthenticationProvider;
import com.ALED.entities.UserRole;
import com.ALED.entities.Users;
import com.ALED.enums.AppConts;
import com.ALED.model.ResponseModel;
import com.ALED.repositories.UserRepository;
import com.ALED.service.IUserServiceSystem;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthencationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;
    @Autowired
	private IUserServiceSystem userServiceSystem;
	
	@Autowired
	private BCryptPasswordEncoder encoder;


    @Autowired
    private JwtAuthenticationProvider tokenProvider;
    
    /* 
    	
     * thực hiện xác thực thông tin người dùng đăng nhập
     * nhận vào LoginRequest, kiểm tra User có tồn tại không
     * thông tin người dùng hợp lệ  dùng JwtAuthenticationProvider để generateToken thừu authentication
     * trả về thông tin tài khoản và token 
     */

    @PostMapping("/signin")
    public ResponseEntity<ResponseModel> signin(@Validated @RequestBody LoginRequest loginRequest) {
        log.info("Login {}", loginRequest.getUsername());
        try {
            Users users = userRepository.findByUsername(loginRequest.getUsername());
            if (users == null) {
                return new ResponseEntity<ResponseModel>(new ResponseModel(AppConts.ReturnCodeApi.ERROR, "Sai tài khoản hoặc mật khẩu"), HttpStatus.OK);
            } else {
                // 1. Create authencation
                if (encoder.matches(loginRequest.getPassword(), users.getPassword())) {
                    Authentication authentication = authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    String token = tokenProvider.generateToken(authentication);
                    JwtAuthenticationResponse response = new JwtAuthenticationResponse();
                    response.setAccessToken(token);
                    response.setId(users.getId());
                    response.setFullName(users.getUsername());
                    response.setUsername(users.getUsername());
                    List<String> lsRole = new ArrayList<>();
                    List<UserRole> lsUserRole = users.getUserRole();
                    for (UserRole eachRole : lsUserRole) {
                        lsRole.add(eachRole.getRole().getRoleName());
                    }
                    response.setRoles(lsRole);
                    return new ResponseEntity<ResponseModel>(new ResponseModel(AppConts.ReturnCodeApi.SUCCESS, response), HttpStatus.OK);
                } else {
                    return new ResponseEntity<ResponseModel>(new ResponseModel(AppConts.ReturnCodeApi.ERROR, "Sai tài khoản hoặc mật khẩu"), HttpStatus.OK);
                }
            }
        } catch (Exception e) {
            log.error("", e);
            return new ResponseEntity<ResponseModel>(new ResponseModel(AppConts.ReturnCodeApi.SYS_ERROR, "Lỗi hệ thống"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
   
    @PostMapping("/register")
	public Users register(@Valid @RequestBody Users user) {
		

		userServiceSystem.create(user);
		return user;
	}
}
