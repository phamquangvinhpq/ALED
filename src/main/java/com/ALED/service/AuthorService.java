package com.ALED.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ALED.DTO.AuthorDTO;
import com.ALED.entities.Author;
import com.ALED.repositories.AuthorRepository;


@Service
public class AuthorService implements IAuthorService {

	@Autowired
	AuthorRepository authorRepository;
	
	
	
	@Override
	public List<AuthorDTO> readAll() {
		List<AuthorDTO> lst = new ArrayList<AuthorDTO>();
		List<Author> authors = authorRepository.findAll();
		for (Author author : authors) {
			AuthorDTO authorDTO = new AuthorDTO();
			BeanUtils.copyProperties(author, authorDTO);
			lst.add(authorDTO);
		}
		return lst;
	}

	@Override
	public AuthorDTO save(AuthorDTO author) {
		Author ett = new Author();
		BeanUtils.copyProperties(author, ett);
		authorRepository.save(ett);
		author.setId(ett.getId());
		return author;
	}

	@Override
	public AuthorDTO update(AuthorDTO author) {
		Optional<Author> optional = authorRepository.findById(author.getId());
		if(optional.isPresent()) {
			Author ett = optional.get();
			BeanUtils.copyProperties(optional, ett);
			authorRepository.save(ett);
		}
		return author;
	}

	@Override
	public AuthorDTO delete(Integer id) {
		AuthorDTO authorDTO = new AuthorDTO();
		Optional<Author> optional = authorRepository.findById(id);
		if(optional.isPresent()) {
			Author author = new Author();
			BeanUtils.copyProperties(author, authorDTO);
			authorRepository.deleteById(id);
		}
		return authorDTO;

	}

	@Override
	public AuthorDTO detail(Integer id) {
		AuthorDTO authorDTO = new AuthorDTO();
		Optional<Author> optional = authorRepository.findById(id);
		if(optional.isPresent()) {
			Author author = optional.get();
			BeanUtils.copyProperties(author, authorDTO);
		}
		return authorDTO;
	}

	@Override
	public List<Author> findpage(Integer pageno, Integer pagesize) {
		Pageable page = PageRequest.of(pageno, pagesize);
		Page<Author> pageinit = authorRepository.findAll(page);
		return  (List<Author>) pageinit ;
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public List<AuthorDTO> searchUser(String keyword) {
		List<AuthorDTO> lst = new ArrayList<AuthorDTO>();
		if(!StringUtils.isEmpty(keyword)) {
			lst = (List<AuthorDTO>) authorRepository.findByNameContaining(keyword);
		}
		return lst;
	}

	

	

}
