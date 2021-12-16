package com.ALED.controller;

import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.web.multipart.MultipartFile;

import com.ALED.DTO.UserAuthorDTO;
import com.ALED.entities.Users;
import com.ALED.entities.author_skill;
import com.ALED.repositories.UserRepository;
import com.ALED.service.FileService;
import com.ALED.service.IUserServiceSystem;

@RestController
public class UserController {

	@Autowired
	private IUserServiceSystem userService;

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;

	@Value("${server.url}")
	private String serverUrl;

	@Value("${server.proto}")
	private String serverProto;

	@Autowired
	private FileService fileService;

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


	@GetMapping("/count")
	public Integer count() {
		return repository.countUser();
	}
	
	
	@GetMapping("/get-gv")
	public List<Users> getAllGv(){
		return userService.getAllGV();
	}
	
	@GetMapping("/get-hs")
	public List<Users> getAllSt(){
		return userService.getAllSt();
	}
	
	@GetMapping("/get-hs-and-gv")
	public List<Users> getAllStAndGv(){
		return userService.getAllStAndGv();
	}
	
	@GetMapping("/get-ins-no-isnable")
	public List<Users> getAllInsNoIsNable(){
		return userService.getAllInsNoIsNable();
	}
	
	@PutMapping("/isenable")
	public Users setNEnable(@RequestBody Users vo) {
		return userService.updateIsEnable(vo);
	}
	
	@PutMapping("/status")
	public Users setStatus(@RequestBody Users vo) {
		return userService.updateStatus(vo);
	}
	

	@PostMapping("/createauthoer")
	public UserAuthorDTO createauthoer(@RequestBody @RequestParam(name = "file", required = false) MultipartFile file, UserAuthorDTO ua
			) throws IOException {
		if (file.getContentType() != null) {

			ua.setImage(serverProto + "://" + serverUrl + "/api/file/imageuser?videoName=" + fileService.uploadImage(file));
			ua.setType(file.getContentType());
		}
		return userService.createAuthor(ua);

	}

	@PostMapping("/user/updatepassword")
	public boolean changePassword(@RequestParam(name = "newPassword", required = false) String newPassword,
			@RequestBody Users vo) {
		return userService.changePassword(vo, newPassword);
	}
	
	
	@GetMapping("/getskill/{id}")
	public List<author_skill> getskill(@PathVariable Integer id){
		return userService.getkill(id);
	}

}
