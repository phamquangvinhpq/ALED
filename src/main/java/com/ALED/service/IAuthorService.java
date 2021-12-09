package com.ALED.service;

import java.util.List;

import com.ALED.DTO.AuthorDTO;
import com.ALED.entities.Author;

public interface IAuthorService {
	
	List<AuthorDTO> readAll();
	
	AuthorDTO save(AuthorDTO AuthorDTO);
	
	AuthorDTO update(AuthorDTO AuthorDTO);
	
	AuthorDTO delete(Integer id);
	
	AuthorDTO detail(Integer id);
	
	List<Author> findpage(Integer pageno,Integer pagesize);
	
	List<AuthorDTO> searchUser(String keyword);
	
}
