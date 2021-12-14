package com.ALED.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ALED.DTO.FavoriteDTO;
import com.ALED.entities.Favorite;
import com.ALED.repositories.CourseRepository;
import com.ALED.repositories.FavoriteRepository;



@Service
public class FavoriteService implements IFavoriteService {

	@Autowired
	private FavoriteRepository favoriteRepository;
	
	@Autowired
	private CourseRepository courseRepository;

	@Override
	public FavoriteDTO create(FavoriteDTO dto) {
		Favorite entity = new Favorite();
		int quantity = favoriteRepository.countByFavorite(dto.getUser_id(), dto.getCourse_id());
		System.out.println(quantity);
		if (quantity > 0) {
			return null;
		}
		else {
			BeanUtils.copyProperties(dto, entity);
			favoriteRepository.save(entity);
			dto.setId(entity.getId());
			return dto;
		}
	}

	@Override
	public List<FavoriteDTO> findAllByUser(Integer user_id) {
		List<FavoriteDTO> dtos = new ArrayList<FavoriteDTO>();
		List<Favorite> entitys = favoriteRepository.findAllByUser(user_id);
		System.out.println(entitys);
		for (Favorite entity : entitys) {
			FavoriteDTO dto = new FavoriteDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setCourse_name(courseRepository.getById(dto.getCourse_id()).getCourseName());
			dto.setImage(courseRepository.getById(dto.getCourse_id()).getImage());
			dtos.add(dto);
		}
		return dtos;
	}

	@Override
	public boolean delete(Integer user_id, Integer course_id) {
		List<Favorite> entitys = favoriteRepository.findAllByUser(user_id);
		for (Favorite entity : entitys) {
			if (entity.getCourse_id() == course_id) {
				favoriteRepository.delete(entity);
				return true;
			}
		}
		return false;
	}
	



}
