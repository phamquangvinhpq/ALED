package com.ALED.service;

import java.util.List;

import javax.mail.MessagingException;

import com.ALED.DTO.UserAuthorDTO;
import com.ALED.entities.Users;



public interface IUserServiceSystem {
	
	public Users create(Users user);
	
	public UserAuthorDTO createAuthor(UserAuthorDTO UserAuthorDTO);

	public List<Users> readAll();
		
	public Users update(Users user);
	
	public Users delete(Integer id);
	
	public Users detail(Integer id);
	
	public List<Users> findpage(Integer pageno,Integer pagesize);
	
	public Users searchUser(String keyword);
	
	public String forgotpassword(Users user) throws MessagingException;
	

}
