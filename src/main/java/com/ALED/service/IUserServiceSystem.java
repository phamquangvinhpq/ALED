package com.ALED.service;

import java.util.List;

import javax.mail.MessagingException;

import com.ALED.DTO.AuthorSkillDTO;
import com.ALED.DTO.UserAuthorDTO;
import com.ALED.DTO.UserDTO;
import com.ALED.entities.Users;
import com.ALED.entities.author_skill;

public interface IUserServiceSystem {

	public Users create(Users user);

	public UserAuthorDTO createAuthor(UserAuthorDTO UserAuthorDTO);

	public List<Users> readAll();

	public Users update(Users user);

	public Users delete(Integer id);

	public Users detail(Integer id);

	public List<Users> findpage(Integer pageno, Integer pagesize);

	public Users searchUser(String keyword);

	public String forgotpassword(Users user) throws MessagingException;

	public boolean changePassword(Users user, String newPassword);

	List<UserDTO> getAllStAndGv(Integer pageno, Integer pagesize);

	List<UserDTO> getAllSt(Integer pageno, Integer pagesize);

	List<UserDTO> getAllGV(Integer pageno, Integer pagesize);

	Users updateStatus(Users user);

	Users updateIsEnable(Users user);

	List<UserDTO> getAllInsNoIsNable(Integer pageno, Integer pagesize);

	List<AuthorSkillDTO> getkill(Integer id);

	String sendMailReport(UserAuthorDTO authorDTO,Integer id);

	String sendMail(UserAuthorDTO authorDTO);



}
