package com.ALED.service;

import java.util.List;

import com.ALED.DTO.LessionDTO;

public interface ILessionService {

	public LessionDTO create(LessionDTO lessionDTO);

	public List<LessionDTO> readAll();

	public LessionDTO update(LessionDTO lessionDTO);

	public LessionDTO delete(Integer id);

	public LessionDTO detail(Integer id);

	public List<LessionDTO> findpage(Integer pageno, Integer pagesize);

	public List<LessionDTO> findAllBySection(Integer sectionId);

}
