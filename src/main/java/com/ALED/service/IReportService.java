package com.ALED.service;

import java.util.List;

import com.ALED.DTO.ReportDTO;

public interface IReportService {
	
	List<ReportDTO> getByStatus(Integer status, Integer page, Integer size);

	ReportDTO create(ReportDTO dto);

	List<ReportDTO> getAllDtos(Integer page, Integer size);
	
	void guiMail(String email, String loiNhan, Integer id);
}
