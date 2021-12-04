package com.ALED.service;

import java.util.List;

import com.ALED.entities.Users;



public interface IUserServiceSystem {
	
	public Users create(Users user);

	public List<Users> readAll();
		
	public Users update(Users user);
	
	public Users delete(Integer id);
	
	public Users detail(Integer id);
	
	public List<Users> findpage(Integer pageno,Integer pagesize);
	
	public Users searchUser(String keyword);

}