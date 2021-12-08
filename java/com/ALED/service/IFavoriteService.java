package com.ALED.service;

import java.util.List;

import com.ALED.DTO.FavoriteDTO;

public interface IFavoriteService {

	public FavoriteDTO create(FavoriteDTO favoriteDTO);

	public List<FavoriteDTO> findAllByUser(Integer userId);

	public boolean delete(Integer user_id, Integer course_id);

}
