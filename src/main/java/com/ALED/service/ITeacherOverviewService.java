package com.ALED.service;

import com.ALED.DTO.TeacherOverviewDTO;

public interface ITeacherOverviewService {
	TeacherOverviewDTO getInfo(Integer courseId);
}
