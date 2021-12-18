package com.ALED.service;

import com.ALED.DTO.StudentOverviewDTO;

public interface IStudentOverviewService {
	StudentOverviewDTO getInfo(Integer student_id);
}
