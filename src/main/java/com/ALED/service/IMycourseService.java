package com.ALED.service;

import java.util.List;

import com.ALED.DTO.MycourseDTO;

public interface IMycourseService {
	
	public MycourseDTO create(MycourseDTO MycourseDTO);

	public List<MycourseDTO> readallbyid(Integer id,int page,int size);


}
