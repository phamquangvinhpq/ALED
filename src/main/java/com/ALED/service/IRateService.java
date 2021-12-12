package com.ALED.service;

import java.util.List;

import com.ALED.DTO.RateDTO;
import com.ALED.DTO.SectionDTO;
import com.ALED.DTO.UserRateDTO;



public interface IRateService {
	
	public SectionDTO create(RateDTO rateDTO);
		
	public RateDTO update(RateDTO rateDTO);
	
	public RateDTO save(RateDTO rateDTO);
	
	
	public List<UserRateDTO> detailcour(Integer id);
	
	public String avgstar(Integer id);

	public String count(Integer id);
	
	
	

}
