package com.ALED.service;

import java.util.List;

import com.ALED.DTO.SectionDTO;



public interface ISectionService {
	
	public SectionDTO create(SectionDTO SectionDTO);

	public List<SectionDTO> readAll();
		
	public SectionDTO update(SectionDTO user);
	
	public SectionDTO delete(Integer id);
	
	public SectionDTO detail(Integer id);
	
	public List<SectionDTO> detailcour(Integer id);
	
	public List<SectionDTO> findpage(Integer pageno,Integer pagesize);
	
	public String muakhoahoc(Integer user_id,Integer course_id);
	
	public String finbykhoahocuser(Integer user_id,Integer course_id);
	
	

}
