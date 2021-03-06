package com.ALED.service;

import java.util.List;

import com.ALED.DTO.LessionDTO;
import com.ALED.entities.Lession;

public interface ILessionService {

	public LessionDTO create(LessionDTO lessionDTO);

	public List<LessionDTO> readAll();

	public LessionDTO update(LessionDTO lessionDTO);

	public LessionDTO delete(Integer id);

	public LessionDTO detail(Integer id);

	public List<LessionDTO> findpage(Integer pageno, Integer pagesize);

	public List<LessionDTO> findAllBySection(Integer sectionId);

	public Lession updatestatus(Lession lession);


	public Lession 	updateTime(Lession lession);

	Lession getLessionbyTime(Integer course);

	public boolean updateXemThu(Integer id, Integer demo);

	LessionDTO Admindelete(Integer id);

}
