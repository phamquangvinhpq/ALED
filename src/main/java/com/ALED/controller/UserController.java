package com.ALED.controller;

import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ALED.DTO.UserAuthorDTO;
import com.ALED.entities.Users;
import com.ALED.service.IUserServiceSystem;

@RestController
public class UserController {

	@Autowired
	private IUserServiceSystem userService;

	@Autowired
	private BCryptPasswordEncoder encoder;

	/**
	 * lấy toàn bộ thông tin user database.
	 * 
	 * @return List<Users>
	 */
	@GetMapping("/user")
	public List<Users> readAll() {
		return userService.readAll();
	}

	@PutMapping("/user")
	public Users update(@RequestBody Users vo) {
		return userService.update(vo);
	}

	/**
	 * xóa 1 user từ database nếu id không tồn tại trả về null
	 *
	 * @param id
	 * @return Users
	 */
	@PreAuthorize("hasRole('ROLE_ADMIN')  ")
	@DeleteMapping("/user/{id}")
	public Users delete(@PathVariable Integer id) {
		return userService.delete(id);
	}

	@GetMapping("/user/{id}")
	public Users detail(@PathVariable Integer id) {
		return userService.detail(id);
	}

	@GetMapping("/viewuser/{pageno}/{pagesize}")
	public List<Users> getpage(@PathVariable Integer pageno, @PathVariable Integer pagesize) {

		return userService.findpage(pageno, pagesize);

	}

	@PostMapping("/forgot-password")
	public String forgotPassword_2(@RequestBody Users user) throws MessagingException {

		return userService.forgotpassword(user);

	}

	
	
	@PostMapping("/createauthoer")
	public UserAuthorDTO createauthoer(@RequestBody UserAuthorDTO ua)  {
		
		return userService.createAuthor(ua);
		

	}


	@PostMapping("/user/updatepassword")
	public boolean changePassword(@RequestParam(name = "newPassword", required = false) String newPassword,
			@RequestBody Users vo) {
		return userService.changePassword(vo, newPassword);
	}

}
